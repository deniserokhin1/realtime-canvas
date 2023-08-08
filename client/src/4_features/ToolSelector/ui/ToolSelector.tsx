import { ITools, tools } from '../model/model'
import { FC } from 'react'
import { buttonHandlerSelector } from '../../lib/buttonHandlerSelector'
import { observer } from 'mobx-react-lite'
import { Button } from '6_shared/ui/Button'
import toolState from '1_app/store/toolState'

interface ToolSelectorProps {
    type: keyof ITools
}

export const ToolSelector: FC<ToolSelectorProps> = observer((props) => {
    const { type } = props
    const { activeTool } = toolState

    const isActive = activeTool === type

    const handler = buttonHandlerSelector(type)

    return <Button isActive={isActive} onClick={handler} children={tools[type]} />
})
