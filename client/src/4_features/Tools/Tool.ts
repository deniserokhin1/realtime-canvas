import toolState from '1_app/store/toolState'

export default class Tool {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    socket: WebSocket
    session: string

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.socket = socket
        this.session = id

        // if (!toolState.tool) {
        //     this.ctx.fillStyle = '#fff'
        //     this.ctx.fillRect(0, 0, canvas.width, canvas.height)
        // }

        this.destroyEvent()
        this.initParam()
    }

    set fillColor(color: string) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color: string) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width
    }

    destroyEvent() {
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
        this.canvas.onmousemove = null
    }

    initParam() {
        this.ctx.strokeStyle = toolState.strokeColor
        this.ctx.fillStyle = toolState.fillColor
        this.ctx.lineWidth = toolState.lineWidth
    }
}
