import { ITools } from '4_features/ToolSelector/model/model'
import Brush from '4_features/Tools/Brush'
import Circle from '4_features/Tools/Circle'
import Line from '4_features/Tools/Line'
import Rect from '4_features/Tools/Rect'
import Washer from '4_features/Tools/Washer'
import { makeAutoObservable } from 'mobx'

type TypeClasses = Line | Brush | Rect | Circle | Washer

class ToolState {
    tool: TypeClasses
    fillColor: string = '#035afc'
    strokeColor: string = '#e8092b'
    lineWidth: number = 2
    activeTool: keyof ITools = null

    constructor() {
        makeAutoObservable(this)
        this.strokeColor = '#e8092b'
    }

    setTool(tool: TypeClasses, type: keyof ITools) {
        this.tool = tool
        this.activeTool = type
    }

    setFillColor(color: string) {
        this.tool.fillColor = color
        this.fillColor = color
    }

    setStrokeColor(color: string) {
        this.tool.strokeColor = color
        this.strokeColor = color
    }

    setLineWidth(width: number) {
        this.tool.lineWidth = width
        this.lineWidth = width
    }
}

export default new ToolState()
