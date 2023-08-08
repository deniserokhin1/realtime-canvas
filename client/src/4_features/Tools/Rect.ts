import toolState from '1_app/store/toolState'
import Tool from './Tool'

export default class Rect extends Tool {
    mouseDown: boolean
    offsetX: number
    offsetY: number
    startX: number
    startY: number
    saved: string
    width: number
    height: number

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
                    type: 'rectangle',
                    x: this.startX,
                    y: this.startY,
                    width: this.width,
                    height: this.height,
                    fillColor: toolState.fillColor,
                    strokeColor: toolState.strokeColor,
                },
            })
        )
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.width = 0
        this.height = 0
        const target = e.target as HTMLElement
        this.offsetX = target.offsetLeft
        this.offsetY = target.offsetTop
        this.startX = e.pageX - this.offsetX
        this.startY = e.pageY - this.offsetY
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {
        if (!this.mouseDown) return

        let currentX = e.pageX - this.offsetX
        let currentY = e.pageY - this.offsetY
        this.width = currentX - this.startX
        this.height = currentY - this.startY
        this.draw(this.startX, this.startY, this.width, this.height)
    }

    draw(x: number, y: number, w: number, h: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static staticDraw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number,
        h: number,
        fillColor: string,
        strokeColor: string
    ) {
        ctx.beginPath()
        ctx.fillStyle = fillColor
        ctx.strokeStyle = strokeColor
        ctx.rect(x, y, w, h)
        ctx.fill()
        ctx.stroke()
    }
}
