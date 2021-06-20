import React, {useState} from "react"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import {useMediaQuery, Dialog, Paper, makeStyles, Box} from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        display: 'inline-block',
        '&:hover': {
            '& .selectedHover': {
                display: 'inline-block !important',
                width: 500,
                height: 200,
                background: 'red'
            },
            cursor: 'pointer'
        }
    },
    selectedHover: {
        display: 'none'
    }
}))

export default function ({children, ...props}) {
    const isModal = useMediaQuery('(max-width: 800px)')
    const [open, setOpen] = useState(false)
    const classes = useStyles()
    const handleClick = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return <>

        <Box className={classes.root}>
            <HelpOutlineIcon/>
            <Paper style={{display: 'none'}} className='selectedHover' >
                <h1>Hello world</h1>
            </Paper>
        </Box>

    </>
}