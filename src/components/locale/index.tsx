import React from 'react'
import {useLocale} from "../../hooks/useLocale";

interface Locale{
    str: string,
    children: React.ReactNode
}

export default React.memo(({str, children}): React.FC<Locale> => {
    const s = children ?? str
    const {translate} = useLocale()
    return <>{translate(s)}</>
})