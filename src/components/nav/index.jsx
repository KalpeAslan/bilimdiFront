import React , {useState, useEffect} from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import {makeStyles, Drawer, List, ListItem ,AppBar ,Toolbar, Typography ,Button ,IconButton} from "@material-ui/core"




const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function () {
    const classes = useStyles()
    const [showDrawer, setShowDrawer] = useState(false)
    const toggleDrawler = ()=>{
        setShowDrawer(!showDrawer)
    }
    return (
            <AppBar position='static' style={{marginBottom: 30}}>
                <Toolbar style={{background: 'white'}}>
                    <Typography variant="h5" className={classes.title}>
                        Bilimdi
                    </Typography>
                </Toolbar>
            </AppBar>
    )
}