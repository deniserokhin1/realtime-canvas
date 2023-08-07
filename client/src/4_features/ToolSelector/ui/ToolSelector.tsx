import { ITools, tools } from '../model/types'
import { FC } from 'react'
import { Tool } from '6_shared/ui/Tool'
import { useCanvasState } from '1_app/store/selectors/useCanvasState'
import { buttonHandlerSelector } from '../../lib/buttonHandlerSelector'
import { observer } from 'mobx-react-lite'

interface ToolSelectorProps {
    type: keyof ITools
}

export const ToolSelector: FC<ToolSelectorProps> = observer((props) => {
    const { type } = props
    const { canvas, offsetX: x, offsetY: y } = useCanvasState()

    console.log('canvas:', canvas);

    const handler = buttonHandlerSelector(type, canvas, x, y)

    return <Tool onClick={handler} children={tools[type]} />
})
