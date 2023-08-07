import type { FC } from 'react'
import { MainPage } from '2_pages/MainPage/ui/MainPage'

interface AppProps {}

export const App: FC<AppProps> = () => {

    return (
        <div className="app">
            <MainPage />
        </div>
    )
}
