import { Input } from '6_shared/ui/Input'
import { settingHandlerSelector } from '../../lib/settingHandlerSelector'
import { ISettings, settings } from '../model/model'
import type { FC } from 'react'
import toolState from '1_app/store/toolState'

interface SettingSelectorProps {
    type: keyof ISettings
}

export const SettingSelector: FC<SettingSelectorProps> = (props) => {
    const { type } = props

    const { fillColor, strokeColor, lineWidth } = toolState

    const handler = settingHandlerSelector(type)

    return (
        <Input
            callback={handler}
            typeInput={settings[type].typeInput}
            children={settings[type].text}
            typeSetting={type}
            defualtValue={
                type === 'fillColor'
                    ? fillColor
                    : type === 'strokeColor'
                    ? strokeColor
                    : type === 'lineWidth'
                    ? lineWidth
                    : ''
            }
        />
    )
}
