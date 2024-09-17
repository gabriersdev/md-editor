import '../../md.css'

import { useContext } from 'react'
import { ThemeContext } from '../../App'

const Preview = () => {
  const theme = useContext(ThemeContext)
  const preview = theme.preview

  return (
    <section className='col preview card p-2 d-flex' id='preview'>
      <span className='p-1 text-muted'>Preview:</span>
      {/* FIX - atualização da renderização (re-renderização) é atrasada, provavelmente pela forma que o react utiliza para fazer a atualização na página. verificar. */}
      <div className='overflow-y-scroll px-1' id='template-preview' dangerouslySetInnerHTML={{ __html: preview }}>
      </div>
    </section>
  )
}

export default Preview