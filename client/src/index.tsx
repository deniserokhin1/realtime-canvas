import { createRoot } from 'react-dom/client'
import { App } from './1_app/App'
import './1_app/styles/index.scss'

const domNode = document.getElementById('root')
const root = createRoot(domNode as HTMLElement)

root.render(<App />)
