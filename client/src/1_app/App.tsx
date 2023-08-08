import type { FC } from 'react'
import { MainPage } from '2_pages/MainPage/ui/MainPage'
import { MyModal } from '6_shared/ui/Modal'

interface AppProps {}

export const App: FC<AppProps> = () => {
    return (
        <div className="app">
            <MainPage />
            <MyModal />
        </div>
    )
}
