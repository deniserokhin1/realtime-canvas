import { useCanvasState } from '1_app/store/selectors/useCanvasState'
import Brush from '4_features/Tools/Brush'
import Rect from '4_features/Tools/Rect'
import { ITools } from '4_features/ToolSelector/model/model'


export interface IWsFigure {
    type: keyof ITools | 'finish'
    x: number
    y: number
    width: number
    height: number
    fillColor: string
    strokeColor: string
}

export type WsMessageType = 'connection' | 'draw'

export interface IWsMessage {
    id: string
    username: string
    method: WsMessageType
    figure: IWsFigure
}

export const drawHandler = (msg: IWsMessage) => {
    const { canvas } = useCanvasState()
    const figure = msg.figure
    const { fillColor, height, strokeColor, type, width, x, y } = figure
    const ctx = canvas.getContext('2d')

    switch (type) {
        case 'brush':
            Brush.draw(ctx, x, y)
            break

        case 'finish':
            ctx.beginPath()
            break

        case 'rectangle':
            Rect.staticDraw(ctx, x, y, width, height, fillColor, strokeColor)
            ctx.beginPath()
            break

        default:
            break
    }
}
