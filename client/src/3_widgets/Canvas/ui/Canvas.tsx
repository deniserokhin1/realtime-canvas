import { classNames } from '6_shared/lib/classNames/classNames'
import style from './Canvas.module.scss'
import { useEffect, type FC, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '1_app/store/canvasState'
import toolState from '1_app/store/toolState'
import { useParams } from 'react-router-dom'
import Brush from '4_features/Tools/Brush'
import { IWsMessage, drawHandler } from '../utils/drawHandler'
import axios from 'axios'

interface CanvasProps {
    className?: string
}

const Canvas: FC<CanvasProps> = observer((props) => {
    const { className } = props
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const { username, canvas } = canvasState
    const { id } = useParams()

    useEffect(() => {
        canvasState.setCanvas(refCanvas.current)
        const ctx = refCanvas.current.getContext('2d')
        axios
            .get(`http://localhost:3001/image?id=${id}`)
            .then((res) => {
                console.log('res.data:', res.data)
                const img = new Image()
                img.src = res.data
                img.onload = () => {
                    ctx.clearRect(0, 0, refCanvas.current.width, refCanvas.current.height)
                    ctx.drawImage(
                        img,
                        0,
                        0,
                        refCanvas.current.width,
                        refCanvas.current.height
                    )
                }
            })
            .catch((e) =>
                console.log(`Error while getting image from server. Error: ${e}`)
            )
    }, [])

    function mouseDown() {
        canvasState.pushToUndo(refCanvas.current.toDataURL())
    }

    function mouseUpHandler() {
        axios
            .post(`http://localhost:3001/image?id=${id}`, {
                img: canvas.toDataURL(),
            })
            .then((res) => console.log(res.data))
    }

    useEffect(() => {
        if (!username) return

        const socket = new WebSocket('ws://localhost:3001')

        canvasState.setSocket(socket)
        canvasState.setSession(id)

        toolState.setTool(new Brush(canvas, socket, id), 'brush')

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    id,
                    username,
                    method: 'connection',
                })
            )

            socket.onmessage = (e) => {
                const msg: IWsMessage = JSON.parse(e.data)
                switch (msg.method) {
                    case 'connection':
                        console.log(`Пользователь ${msg.username} подключился.`)
                        break

                    case 'draw':
                        drawHandler(msg)
                        break

                    default:
                        break
                }
            }
        }
    }, [username])

    return (
        <div className={classNames(style.container, {}, [className])}>
            <canvas
                onMouseDown={mouseDown}
                onMouseUp={mouseUpHandler}
                width={1000}
                height={550}
                ref={refCanvas}
            />
        </div>
    )
})

export default Canvas
