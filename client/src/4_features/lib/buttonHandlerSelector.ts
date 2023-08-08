import Rect from '../Tools/Rect'
import Circle from '../Tools/Circle'
import Line from '../Tools/Line'
import Washer from '../Tools/Washer'
import Brush from '../Tools/Brush'
import { ISystemButtons } from '../SystemButton/model/model'
import { ITools } from '../ToolSelector/model/model'
import toolState from '1_app/store/toolState'
import canvasState from '1_app/store/canvasState'

export function buttonHandlerSelector(type: keyof ITools | keyof ISystemButtons) {
    const { socket, session, canvas } = canvasState

    switch (type) {
        case 'brush':
            return () => toolState.setTool(new Brush(canvas, socket, session), type)

        case 'rectangle':
            return () => toolState.setTool(new Rect(canvas, socket, session), type)

        // case 'circle':
        //     return () => toolState.setTool(new Circle(canvas, socket, session), type))

        // case 'line':
        //     return () => toolState.setTool(new Line(canvas, socket, session), type))

        // case 'washer':
        //     return () => toolState.setTool(new Washer(canvas, socket, session), type))

        case 'undo':
            return () => canvasState.undo()

        case 'redo':
            return () => canvasState.redo()

        case 'save':
            return () => {
                const dataURL = canvasState.canvas.toDataURL()
                console.log('dataURL:', dataURL)
                const a = document.createElement('a')
                a.href = dataURL
                a.download = canvasState.session + '.jpeg'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            }

        default:
            break
    }
}
