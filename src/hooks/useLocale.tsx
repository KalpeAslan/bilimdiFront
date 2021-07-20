import React, {useContext} from 'react'
import {LocaleContext} from "../contexts/LocaleProvider";

export const useLocale = () => {
    return useContext(LocaleContext)
}


export const useTranslate = (str: string): string => {
    const {translate} = useLocale()
    return translate(str)
}