import { createRoot } from 'react-dom/client'
import { App } from './1_app/App'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import '1_app/styles/index.scss'

const domNode = document.getElementById('root')
const root = createRoot(domNode as HTMLElement)

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/:id" element={<App />} />
            <Route
                path="/"
                element={
                    <>
                        <App />
                        <Navigate to={`/f${(+new Date()).toString(16)}`} replace />
                    </>
                }
            />
        </Routes>
    </BrowserRouter>
)
