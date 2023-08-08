import { Container } from '6_shared/ui/Container'
import type { FC } from 'react'
import { ITools, tools } from '4_features/ToolSelector/model/model'
import { ToolSelector } from '4_features/ToolSelector'
import { ISettings, settings } from '4_features/SettingSelector/model/model'
import { SettingSelector } from '4_features/SettingSelector'
import { ISystemButtons, buttons } from '4_features/SystemButton/model/model'
import { ButtonSelector } from '4_features/SystemButton/ui/ButtonSelector'

interface ToolbarProps {}

export const Toolbar: FC<ToolbarProps> = () => {
    return (
        <Container>
            {(Object.keys(tools) as Array<keyof ITools>).map((type) => (
                <ToolSelector type={type} key={type} />
            ))}

            {(Object.keys(settings) as Array<keyof ISettings>).map((type) => (
                <SettingSelector type={type} key={type} />
            ))}

            {(Object.keys(buttons) as Array<keyof ISystemButtons>).map((type) => (
                <ButtonSelector type={type} key={type} />
            ))}
        </Container>
    )
}
