import Rect from '../Tools/Rect'
import Circle from '../Tools/Circle'
import Line from '../Tools/Line'
import Washer from '../Tools/Washer'
import Brush from '../Tools/Brush'
import { ISystemButtons } from '../SystemButton/model/model'
import { ITools } from '../ToolSelector/model/types'
import toolState from '1_app/store/toolState'
import canvasState from '1_app/store/canvasState'

export function buttonHandlerSelector(
    type: keyof ITools | keyof ISystemButtons,
    canvas?: HTMLCanvasElement,
    x?: number,
    y?: number
) {
    switch (type) {
        case 'brush':
            return () => toolState.setTool(new Brush(canvas, x, y))

        case 'rectangle':
            return () => toolState.setTool(new Rect(canvas, x, y))

        case 'circle':
            return () => toolState.setTool(new Circle(canvas, x, y))

        case 'line':
            return () => toolState.setTool(new Line(canvas, x, y))

        case 'washer':
            return () => toolState.setTool(new Washer(canvas, x, y))

        case 'undo':
            return () => canvasState.undo()

        case 'redo':
            return () => canvasState.redo()

        default:
            break
    }
}
