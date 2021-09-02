import React, {createContext} from 'react'
import { DIContainer } from '../services/main'
import { IDIContainer } from '../services/main'

export const DIContext = createContext<Partial<IDIContainer>>({})

export function DIProvider({children}) {
    return <DIContext.Provider value={DIContainer}>
        {children}
    </DIContext.Provider>
}