import React, {useState, useEffect} from 'react'
import {makeStyles, Drawer, List, ListItem, AppBar, Toolbar, Typography, Button, IconButton} from "@material-ui/core"
import {useScrollTrigger} from "@material-ui/core"
import {useScroll} from "../../hooks/useScroll"

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        background: 'white',
    }
}))


export default function () {
    const classes = useStyles()
    const [showDrawer, setShowDrawer] = useState(false)
    const scrolledToTarget = useScroll(0)
    const toggleDrawler = () => {
        setShowDrawer(!showDrawer)
    }
    return (
        <AppBar position="static" style={{
            marginBottom: 30,
            transition: 'box-shadow 0.4s',
            // boxShadow: scrolledToTarget ? boxShadow : 'none',
            boxShadow: scrolledToTarget ?
                '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)' :
                'none'
        }}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5">
                    Bilimdi
                </Typography>

            </Toolbar>
        </AppBar>
    )
}