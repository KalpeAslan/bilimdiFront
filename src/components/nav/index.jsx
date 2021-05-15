import React , {useState, useEffect} from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import {makeStyles, Drawer, List, ListItem ,AppBar ,Toolbar, Typography ,Button ,IconButton} from "@material-ui/core"

import NavService from 'services/navService.ts'

const navService = new NavService()


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
            <AppBar position='static'>
                <Toolbar>
                    <IconButton onClick={toggleDrawler} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        OQY
                    </Typography>

                    <Button color="inherit" >Login</Button>
                    <Drawer anchor="left" open={showDrawer} onBackdropClick={toggleDrawler}>
                        <List onClick={toggleDrawler} onKeyDown={toggleDrawler} style={{width: 255}}>
                            {navService.listElems.map(elem=>{
                                return <ListItem key={elem.name}>
                                    {elem.name}
                                </ListItem>
                            })}
                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>
    )
}