import { classNames } from '../../lib/classNames/classNames'
import style from './Tool.module.scss'
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ToolProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
}

export const Tool: FC<ToolProps> = (props) => {
    const { children, ...otherProps } = props
    return (
        <button className={classNames(style.container)} {...otherProps}>
            {children}
        </button>
    )
}
