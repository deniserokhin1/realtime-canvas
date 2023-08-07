import canvasState from '../canvasState'

export function useCanvasState() {
    return {
        offsetX: canvasState.offsetX,
        offsetY: canvasState.offsetY,
        canvas: canvasState.canvas,
    }
}
