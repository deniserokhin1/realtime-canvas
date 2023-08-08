import { classNames } from '../../lib/classNames/classNames'
import style from './Button.module.scss'
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

export enum ThemeButton {
    CLEAR = 'clear',
    BACKGROUND = 'background',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    theme?: ThemeButton
    className?: string
    isActive?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        theme = ThemeButton.CLEAR,
        className,
        isActive = true,
        ...otherProps
    } = props

    const mods = {
        [style.isActive]: isActive,
    }

    return (
        <button
            className={classNames(style.container, mods, [style[theme], className])}
            {...otherProps}
        >
            {children}
        </button>
    )
}
