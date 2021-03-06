import React, {createContext} from "react"
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        maxWidth: 'auto',
        [theme.breakpoints.up('md')]: {
            maxWidth: 1280
        },
        boxSizing: 'border-box',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 24px'
    }
}))
export const ClassesContext = createContext({})

export function ClassesProvider({children}) {
    const classes = useStyles()
    return <ClassesContext.Provider value={classes}>
        {children}
    </ClassesContext.Provider>
}
