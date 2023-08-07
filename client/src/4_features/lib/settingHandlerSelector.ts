import toolState from '1_app/store/toolState'
import { ISettings } from '4_features/SettingSelector/model/model'

export function settingHandlerSelector(type: keyof ISettings) {
    switch (type) {
        case 'strokeColor':
            return (color: string) => toolState.setStrokeColor(color)

        case 'fillColor':
            return (color: string) => toolState.setFillColor(color)

        case 'lineWidth':
            return (width: number) => toolState.setLineWidth(width)

        default:
            break
    }
}
