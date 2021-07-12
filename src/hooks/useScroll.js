import React, {useCallback, useEffect, useState} from "react"


export const useScroll = (breakpoint) => {
    const [scrolledToTarget, setScrolledToTarget] = useState(false)

    const handleScroll = useCallback((windowScrollY) => {
        if (windowScrollY === breakpoint) {
            setScrolledToTarget(true)
            window.removeEventListener('scroll', () => {
            })
        } else {
            setScrolledToTarget(false)
        }
    }, [scrolledToTarget])

    useEffect(() => {
        if (!scrolledToTarget) {
            window.addEventListener('scroll', () => {
                handleScroll(window.scrollY)
            })
        }
        handleScroll(window.scrollY)

    }, [scrolledToTarget])
    return scrolledToTarget;
}

