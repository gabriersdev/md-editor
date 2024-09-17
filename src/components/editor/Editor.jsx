import { FloatingLabel, Form } from 'react-bootstrap'

import { useContext } from 'react'
import { ThemeContext } from '../../App'

const Editor = () => {
  const theme = useContext(ThemeContext)
  const { text, handleText } = theme

  return (
    <section className='col editor' id='editor'>
      <FloatingLabel
        htmlFor="text-editor"
        label="Editor .md"
      >
        <Form.Control as="textarea" className='text-editor fs-5' placeholder='...' id="text-editor" value={text} onChange={handleText} spellCheck="true" />
      </FloatingLabel>
    </section>
  )
}

export default Editor