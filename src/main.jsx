// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
  // https://react.dev/reference/react/StrictMode
  // <StrictMode>
    // <App />
  // </StrictMode>,
// )

const root = createRoot(document.getElementById('root'))
root.render(<App />)