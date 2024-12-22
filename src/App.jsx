import { useState } from 'react'
import './App.css'

function App() {
  const [pText, setPText] = useState('Original Text With React')
  function updateTextHandler() {
    setPText('Text was changed!')
  }

  return (
    <>
      <button onClick={updateTextHandler}>
        Click to change paragraph&apos;s text
      </button>
      <p>{pText}</p>
    </>
  )
}

export default App
