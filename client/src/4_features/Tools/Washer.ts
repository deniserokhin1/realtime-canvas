import Brush from './Brush'

export default class Washer extends Brush {
    mouseDown: boolean
    offsetX: number
    offsetY: number

    constructor(
        canvas: HTMLCanvasElement,
        x: number,
        y: number,
        socket: WebSocket,
        id: string
    ) {
        super(canvas, socket, id)
    }

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.strokeStyle = 'white'
        this.ctx.stroke()
    }
}
