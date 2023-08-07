import toolState from '1_app/store/toolState'
import Tool from './Tool'

export default class Brush extends Tool {
    mouseDown: boolean
    offsetX: number
    offsetY: number

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
        this.ctx.moveTo(e.pageX - this.offsetX, e.pageY - this.offsetY)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (!this.mouseDown) return
        this.draw(e.pageX - this.offsetX, e.pageY - this.offsetY)
    }

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        this.ctx.strokeStyle = toolState.strokeColor
        this.ctx.lineWidth = toolState.lineWidth
    }
}
