import React, {createContext} from "react"



export const ClassesContext = createContext({})

export function ClassesProvider({children, value}) {
    return <ClassesContext.Provider value={value}>
        {children}
    </ClassesContext.Provider>
}
