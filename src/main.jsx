import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home'
import Carousel from './components/Carousel'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Carousel />
  </StrictMode>,
)
