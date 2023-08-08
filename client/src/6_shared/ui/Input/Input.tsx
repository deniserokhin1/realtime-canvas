import { type ChangeEvent, type FC, type ReactNode } from 'react'
import style from './Input.module.scss'
import { ISettings, TypeInput } from '4_features/SettingSelector/model/model'
import { classNames } from '../../lib/classNames/classNames'

interface InputProps {
    children?: ReactNode
    callback?: (color: string | number) => void
    typeInput: TypeInput
    typeSetting?: keyof ISettings
    defualtValue?: string | number
    className?: string
    value?: string
}

export const Input: FC<InputProps> = (props) => {
    const { children, callback, typeInput, typeSetting, defualtValue, className } = props

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        let value = e.target.value.trim()
        callback(value)
    }

    const mods = {
        [style.margin]: typeInput !== 'string',
    }

    return (
        <div className={classNames(style.container, mods)}>
            {children && <label htmlFor={typeSetting}>{children}</label>}

            <input
                id={typeSetting}
                onChange={(e) => changeHandler(e)}
                className={classNames(style.padding, {}, [className])}
                type={typeInput}
                min={1}
                max={50}
                defaultValue={defualtValue}
            />
        </div>
    )
}
