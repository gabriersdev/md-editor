import { useEffect, useState } from 'react'
import { Container, Button, FloatingLabel, Form } from 'react-bootstrap'

import markdownIt from 'markdown-it'
import print from 'print-js'
import './App.css'

// TODO - Criar estilização
// Exemplo bom para alterar: https://stackedit.io/style.css

function App() {
  const [text, setText] = useState('# Hello World!')
  const [preview, setPreview] = useState('')

  const handleText = (e) => {
    // console.log('HandleText:', e.target.value.length);
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

    try {
      print({
        printable: 'template-preview',
        type: 'html',
        css: 'https://stackedit.io/style.css',
      })
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
  }, [])

  return (
    <Container>
      <header className='header'>
        <hgroup className='my-3'>
          <h1 className='display-6 fw-medium'>Editor de Markdown</h1>
        </hgroup>
        <div className='d-flex gap-1 my-3'>
          <Button variant='primary' disabled={true}>Estilizar</Button>
          <Button variant='secondary' onClick={handleDownloadMarkdown}>Baixar .md</Button>
          <Button variant='secondary' onClick={handleDownloadPDF}>Baixar .pdf</Button>
        </div>
      </header>
      <main className='row mt-3 mb-3'>
        <section className='col editor' id='editor'>
          <FloatingLabel
            htmlFor="text-editor"
            label="Editor .md"
          >
            <Form.Control as="textarea" className='text-editor fs-5' placeholder='...' id="text-editor" value={text} onChange={handleText} spellCheck="true" />
          </FloatingLabel>
        </section>
        <section className='col preview card p-2 d-flex' id='preview'>
          <span className='p-1 text-muted'>Preview:</span>
          {/* FAIL - atualização da renderização (re-renderização) é atrasada, provavelmente pela forma que o react utiliza para fazer a atualização na página. verificar. */}
          <div className='overflow-y-scroll px-1' id='template-preview' dangerouslySetInnerHTML={{ __html: preview }}>
          </div>
        </section>
      </main>
    </Container >
  )
}

export default App
