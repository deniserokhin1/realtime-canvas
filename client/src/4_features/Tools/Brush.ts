import toolState from '1_app/store/toolState'
import Tool from './Tool'

export default class Brush extends Tool {
    mouseDown: boolean
    offsetX: number
    offsetY: number

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false

        this.socket.send(
            JSON.stringify({
                method: 'draw',
                id: this.session,
                figure: {
                    type: 'finish',
                },
            })
        )
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        const target = e.target as HTMLElement
        this.offsetX = target.offsetLeft
        this.offsetY = target.offsetTop
        this.ctx.moveTo(e.pageX - this.offsetX, e.pageY - this.offsetY)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (!this.mouseDown) return
        this.socket.send(
            JSON.stringify({
                method: 'draw',
                id: this.session,
                figure: {
                    type: 'brush',
                    x: e.pageX - this.offsetX,
                    y: e.pageY - this.offsetY,
                },
            })
        )
    }

    static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.strokeStyle = toolState.strokeColor
        ctx.lineWidth = toolState.lineWidth
    }
}
