import style from './Canvas.module.scss'
import type { FC } from 'react'

interface CanvasProps {}

export const Canvas: FC<CanvasProps> = () => {
    return <div className={style.container}>
        <canvas></canvas>
    </div>
}
