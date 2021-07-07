import React from 'react'
import {Link} from 'react-router-dom'
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Box
} from "@material-ui/core"
import {useScroll} from "../../hooks/useScroll"
import {useGlobalClasses} from "../../hooks/useGlobalClasses"
import classNames from "classnames"

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}))


export default function () {
    const classes = useStyles()
    const globalClasses = useGlobalClasses()
    const scrolledToTarget = useScroll(0)
    return (
        <AppBar position="sticky" style={{
            marginBottom: 30,
            transition: 'box-shadow 0.4s',
            // boxShadow: scrolledToTarget ? boxShadow : 'none',
            boxShadow: scrolledToTarget ?
                '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)' :
                'none',
            background: 'white',
        }}>
            <Toolbar className={classNames(classes.toolbar, globalClasses.container)}>
                <Link to='/'>
                    <Typography variant="h5">
                        Bilimdi
                    </Typography>
                </Link>
                <Box display='flex' justifyContent='space-between'>
                    <Link to='/'>
                        <Typography variant="h5" style={{marginRight: 30, cursor:"pointer"}}>
                            Найти грант
                        </Typography>
                    </Link>
                    {/*<Link to='filter'>*/}
                    {/*    <Typography variant="h5" style={{cursor:"pointer"}}>*/}
                    {/*        Калькулятор*/}
                    {/*    </Typography>*/}
                    {/*</Link>*/}
                </Box>
            </Toolbar>
        </AppBar>
    )
}