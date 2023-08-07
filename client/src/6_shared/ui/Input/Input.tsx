import { type ChangeEvent, type FC, type ReactNode } from 'react'
import style from './Input.module.scss'
import { ISettings, TypeInput } from '4_features/SettingSelector/model/model'

interface InputProps {
    children: ReactNode
    callback: (color: string | number) => void
    typeInput: TypeInput
    typeSetting: keyof ISettings
    defualtValue?: string | number
}

export const Input: FC<InputProps> = (props) => {
    const { children, callback, typeInput, typeSetting, defualtValue } = props

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        let value = e.target.value
        callback(value)
    }

    return (
        <div className={style.container}>
            <label htmlFor={typeSetting}>{children}</label>

            <input
                id={typeSetting}
                onChange={(e) => changeHandler(e)}
                className={style.padding}
                type={typeInput}
                min={1}
                max={50}
                defaultValue={defualtValue}
            />
        </div>
    )
}
