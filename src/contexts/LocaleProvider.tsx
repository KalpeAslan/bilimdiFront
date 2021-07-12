import * as React from "react";
import localeKz from '../locale/kz.json'
import {useMemo, useState} from "react";

export const LocaleContext = React.createContext({})


const generateTranslater = (lang: string): string => {
    const isKz = lang === 'kz'
    const dictionary = JSON.parse(localeKz)
    return (str: string): string => {
        if(isKz) return dictionary[str]
        return str
    }
}

export const LocaleProvider = ({children})=> {
    const [lang, setLang] = useState('kz')

    const contextValue = useMemo(()=> {
        return () => ({
            translate: generateTranslater(lang),
            changeLang: (newLang) => setLang(newLang),
            currentLang: lang
        })
    }, [])
    return <LocaleContext.Provider value={contextValue}>
        {children}
    </LocaleContext.Provider>
}