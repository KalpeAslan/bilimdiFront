import * as React from "react";
import localeKz from '../locale/kz'
import {useMemo, useState} from "react";
import {useDispatch} from "react-redux";

export const LocaleContext = React.createContext({})


const generateTranslator = (lang: string): string => {
    const isKz = lang === 'kz'
    return (str: string): string => {
        if (isKz) return localeKz[str]
        return str
    }
}

export function LocaleProvider({children}) {
    const [lang, setLang] = useState<string>('kz');
    const dispatch = useDispatch()

    const contextValue = useMemo(() => {
        return {
            translate: generateTranslator(lang),
            changeLanguage: (newLang) => {
                dispatch({type: 'CHANGE_LANGUAGE', value: newLang})
                setLang(newLang)
            },
            currentLanguage: lang
        };
    }, [lang]);
    return <LocaleContext.Provider value={contextValue}>
        {children}
    </LocaleContext.Provider>
}

