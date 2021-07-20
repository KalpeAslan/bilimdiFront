import React from 'react'
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import classNames from "classnames";
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

export const Container: React.ReactChildren<React.ReactChildren> = ({children, className}) => {
    const classes = useStyles()
    return <Box className={classNames(classes.container, className)} >
        {children}
    </Box>
}