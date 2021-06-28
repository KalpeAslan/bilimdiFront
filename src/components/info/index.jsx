import React, {useState} from "react"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import {useMediaQuery, Dialog, Paper, makeStyles, Box} from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        '&:hover': {
            '& .tooltipWrapper': {
                display: 'inline-block !important',
                ...theme.mixins.size('450px', '250px'),
                position: 'absolute',
                left: '100%',
                zIndex: 999,
                '& .tooltip': {
                    background: 'white',
                    border: '1px solid black',
                    borderRadius: '10px',
                    textAlign:'center',
                    position: 'absolute',
                    padding: 10,
                    top: 25,
                    left: 25
                }
            },
        }
    },
}))

export default function ({children}) {
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
            <Box style={{display: 'none'}} className='tooltipWrapper'>
                <Paper className='tooltip'>
                    {children}
                </Paper>
            </Box>
        </Box>
    </>
}