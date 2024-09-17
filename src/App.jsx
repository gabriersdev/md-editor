import './App.css'

import markdownIt from 'markdown-it'

import { createContext, useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'

import Editor from './components/editor/Editor'
import Preview from './components/preview/Preview'

import html2pdf from 'html2pdf.js'

export const ThemeContext = createContext()

function App() {
  const [text, setText] = useState('# Hello World!')
  const [preview, setPreview] = useState('')

  const handleText = (e) => {
    setText(e.target.value)
    setPreview(markdownIt().render(text))
  }

  const handleDownloadMarkdown = (e) => {
    let [htmlOriginal, timeout] = [e.target.innerHTML, null]
    e.preventDefault()
    clearTimeout(timeout)

    try {
      const element = document.createElement('a')
      const file = new Blob([text], { type: 'text/markdown' })
      element.href = URL.createObjectURL(file)
      element.download = 'markdown.md'
      document.body.appendChild(element)
      element.click()
      element.remove()
      e.target.innerHTML = 'Baixado!'
    } catch (error) {
      console.error(error)
      e.target.innerHTML = 'Erro ao baixar'
    } finally {
      timeout = setTimeout(() => {
        e.target.innerHTML = htmlOriginal
      }, 750)
    }
  }

  const handleDownloadPDF = (e) => {
    let [htmlOriginal, timeout] = [e.target.innerHTML, null]
    e.preventDefault()

    clearTimeout(timeout)

    const filename = document.querySelector('#template-preview h1') ? `${document.querySelector('#template-preview h1').textContent.split(' ').map((s) => s + '-').join('')}` : 'md-editor'

    console.log(filename);

    const element = document.getElementById('template-preview');
    const opt = {
      margin: 0.5,
      filename: `${filename.endsWith('-') ? filename.slice(0, -1) : filename}.pdf`,
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();

    try {
      e.target.innerHTML = 'Baixado!'
    } catch (error) {
      console.error(error)
      e.target.innerHTML = 'Erro ao baixar'
    } finally {
      timeout = setTimeout(() => {
        e.target.innerHTML = htmlOriginal
      }, 750)
    }
  }

  useEffect(() => {
    setPreview(markdownIt().render(text))
  }, [text])

  return (
    <ThemeContext.Provider value={{ text: text, handleText: handleText, preview: preview }}>
      <Container>
        <header className='header'>
          <hgroup className='my-3'>
            <h1 className='display-6 fw-medium' style={{ border: 'none', marginBottom: 0 }}>Editor de Markdown</h1>
          </hgroup>
          <div className='d-flex gap-1 my-3'>
            <Button variant='primary' disabled={true}>Estilizar</Button>
            <Button variant='secondary' onClick={handleDownloadMarkdown}>Baixar .md</Button>
            <Button variant='secondary' onClick={handleDownloadPDF}>Baixar .pdf</Button>
          </div>
        </header>
        <main className='row mt-3 mb-3'>
          <Editor />
          <Preview />
        </main>
      </Container >
    </ThemeContext.Provider>
  )
}

export default App
