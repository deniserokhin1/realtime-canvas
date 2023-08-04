import { Container } from '6_shared/ui/Container'
import style from './Toolbar.module.scss'
import type { FC } from 'react'

interface ToolbarProps {}

export const Toolbar: FC<ToolbarProps> = () => {
    return <Container>Инструменты</Container>
}
