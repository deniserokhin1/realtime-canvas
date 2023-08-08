import { Dialog } from '@headlessui/react'
import { useCallback, useState } from 'react'
import style from './Modal.module.scss'
import { classNames } from '../../lib/classNames/classNames'
import { Button } from '../Button'
import { ThemeButton } from '../Button/Button'
import { Input } from '../Input'
import canvasState from '1_app/store/canvasState'

export function MyModal() {
    const [isOpen, setIsOpen] = useState(true)
    const [value, setValue] = useState('')

    const closeModal = () => {
        if (!value) return
        setIsOpen(false)
        canvasState.setUserName(value)
    }

    const openModal = () => setIsOpen(true)

    const changeHandler = useCallback((name: string) => {
        setValue(name)
    }, [])

    const modsWrapper = {
        [style.hide]: !isOpen,
    }

    return (
        <>
            <div className={classNames(style.mainWrapper, modsWrapper)}>
                <Dialog className={style.dialog} open={isOpen} onClose={openModal}>
                    <div className={style.midContainer}>
                        <Dialog.Panel className={style.dialogPanel}>
                            <Dialog.Title as="h3" className={style.title}>
                                Введите ваше имя
                            </Dialog.Title>

                            <Input
                                typeInput="string"
                                className={style.input}
                                callback={changeHandler}
                                defualtValue={value}
                            />

                            <Button
                                children="Войти"
                                theme={ThemeButton.BACKGROUND}
                                onClick={closeModal}
                                className={style.buttonMargin}
                                isActive={Boolean(value)}
                            />
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>
        </>
    )
}
