export type TypeInput = 'color' | 'number'

export interface ISettings {
    fillColor: { text: string; typeInput: TypeInput }
    strokeColor: { text: string; typeInput: TypeInput }
    lineWidth: { text: string; typeInput: TypeInput }
}

export const settings: ISettings = {
    fillColor: { text: '', typeInput: 'color' },
    strokeColor: { text: '', typeInput: 'color' },
    lineWidth: { text: 'Ширина линии', typeInput: 'number' },
}
