import { Toolbar } from '3_widgets/Toolbar'
import style from './MainPage.module.scss'
import type { FC } from 'react'
import Canvas from '3_widgets/Canvas/ui/Canvas'

interface MainPageProps {}

export const MainPage: FC<MainPageProps> = () => {
    return (
        <div className={style.wrapper}>
            <Toolbar />
            <Canvas className={style.offsetCanvas} />
        </div>
    )
}
