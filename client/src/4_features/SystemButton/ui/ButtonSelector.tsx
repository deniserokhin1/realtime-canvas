import type { FC } from 'react'
import { ISystemButtons, buttons } from '../model/model'
import { buttonHandlerSelector } from '../../lib/buttonHandlerSelector'
import { Button } from '6_shared/ui/Button'

interface ButtonSelectorProps {
    type: keyof ISystemButtons
}

export const ButtonSelector: FC<ButtonSelectorProps> = (props) => {
    const { type } = props

    const handler = buttonHandlerSelector(type)

    return <Button onClick={handler} children={buttons[type]} />
}
