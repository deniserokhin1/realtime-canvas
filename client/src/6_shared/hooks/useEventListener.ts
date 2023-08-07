import { RefObject, useEffect, useLayoutEffect, useRef } from 'react'

export function useEventListener<
    H extends keyof HTMLElementEventMap,
    T extends HTMLElement
>(
    eventName: H,
    handler: (event: HTMLElementEventMap[H] | Event) => void,
    element?: RefObject<T>,
    options?: boolean | AddEventListenerOptions
) {
    const savedHandler = useRef(handler)

    useLayoutEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        const targetElement: T | Window = element?.current ?? window

        if (!(targetElement && targetElement.addEventListener)) return

        const listener: typeof handler = (event) => savedHandler.current(event)

        targetElement.addEventListener(eventName, listener, options)

        return () => {
            targetElement.removeEventListener(eventName, listener, options)
        }
    }, [eventName, element, options])
}
