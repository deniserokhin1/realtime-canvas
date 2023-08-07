import Brush from './Brush'

export default class Washer extends Brush {
    mouseDown: boolean
    offsetX: number
    offsetY: number

    constructor(canvas: HTMLCanvasElement, x: number, y: number) {
        super(canvas, x, y)
    }

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.strokeStyle = 'white'
        this.ctx.stroke()
    }
}
