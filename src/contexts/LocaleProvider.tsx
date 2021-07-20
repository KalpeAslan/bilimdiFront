import * as React from "react";
import localeKz from '../locale/kz'
import {useMemo, useState} from "react";

export const LocaleContext = React.createContext({})


const generateTranslator = (lang: string): string => {
    const isKz = lang === 'kz'
    return (str: string): string => {
        if(isKz) return localeKz[str]
        return str
    }
}

export function LocaleProvider({children}): React.FC<React.ReactNode> {
    const [lang, setLang] = useState<string>('kz');

    const contextValue = useMemo(() => {
        return {
            translate: generateTranslator(lang),
            changeLanguage: (newLang) => setLang(newLang),
            currentLanguage: lang
        };
    }, [lang]);
    return <LocaleContext.Provider value={contextValue}>
        {children}
    </LocaleContext.Provider>
}

