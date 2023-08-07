import { classNames } from '6_shared/lib/classNames/classNames'
import style from './Canvas.module.scss'
import { useEffect, type FC, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Brush from '4_features/Tools/Brush'
import { useEventListener } from '6_shared/hooks/useEventListener'
import canvasState from '1_app/store/canvasState'
import toolState from '1_app/store/toolState'

interface CanvasProps {
    className?: string
}

export const Canvas: FC<CanvasProps> = observer((props) => {
    const { className } = props
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const refContainer = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const canvas = refCanvas.current
        const { x, y } = canvas.getBoundingClientRect()

        canvasState.setOffset(x, y)
        canvasState.setCanvas(canvas)
        toolState.setTool(new Brush(canvas, x, y))
    }, [])

    useEffect(() => {
        if (!refContainer.current) return
        const { width, height } = refContainer.current.getBoundingClientRect()

        setHeight(height)
        setWidth(width)
    }, [refContainer, update])

    useEventListener('resize', () => {
        setUpdate((prev) => !prev)
    })

    function mouseDown() {
        canvasState.pushToUndo(refCanvas.current.toDataURL())
    }

    return (
        <div className={classNames(style.container, {}, [className])} ref={refContainer}>
            <canvas
                onMouseDown={mouseDown}
                width={width * 0.75}
                height={height}
                ref={refCanvas}
            />
            <div className={style.chat} style={{ left: width * 0.77 }}>
                <div className={style.containerChat}></div>
            </div>
        </div>
    )
})
