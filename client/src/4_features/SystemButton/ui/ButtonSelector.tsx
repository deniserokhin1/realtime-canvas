import { Tool } from '6_shared/ui/Tool'

import type { FC } from 'react'
import { ISystemButtons, buttons } from '../model/model'
import { buttonHandlerSelector } from '../../lib/buttonHandlerSelector'

interface ButtonSelectorProps {
    type: keyof ISystemButtons
}

export const ButtonSelector: FC<ButtonSelectorProps> = (props) => {
    const { type } = props

    const handler = buttonHandlerSelector(type)

    return <Tool onClick={handler}>{buttons[type]}</Tool>
}
