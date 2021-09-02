import React, {useContext} from 'react'
import {LocaleContext} from "../contexts/LocaleProvider";

type TLocaleContext = typeof LocaleContext

export const useLocale = (): TLocaleContext => {
    return useContext(LocaleContext)
}


export const useTranslate = (str: string): string => {
    const {translate} = useLocale()
    return translate(str)
}