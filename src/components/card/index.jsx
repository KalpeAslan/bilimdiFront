import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import {Box, makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        transition: 'filter 0.4s',
        '&:hover': {
            cursor: 'pointer',
            filter: 'drop-shadow(0 2px 3px rgba(21,29,36,.08))'
        }
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

export default function ({click, children, style}) {
    const classes = useStyles()
    return (
        <Card className={classes.root} variant="outlined" onClick={click} style={style}>
            <CardContent className={classes.cardContent}>
                <Box>
                    {children}
                </Box>
                <NavigateNextIcon/>
            </CardContent>
        </Card>
    )
}