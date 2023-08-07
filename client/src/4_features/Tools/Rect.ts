import Tool from './Tool'

export default class Rect extends Tool {
    mouseDown: boolean
    offsetX: number
    offsetY: number
    startX: number
    startY: number
    saved: string

    constructor(canvas: HTMLCanvasElement, x: number, y: number) {
        super(canvas)
        this.listen()
        this.offsetX = x
        this.offsetY = y
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - this.offsetX
        this.startY = e.pageY - this.offsetY
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {
        if (!this.mouseDown) return

        let currentX = e.pageX - this.offsetX
        let currentY = e.pageY - this.offsetY
        let width = currentX - this.startX
        let height = currentY - this.startY
        this.draw(this.startX, this.startY, width, height)
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
}
