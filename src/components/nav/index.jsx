import React, {useCallback} from 'react'
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
import {useLocale, useTranslate} from "../../hooks/useLocale"

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
    const {currentLanguage, changeLanguage} = useLocale()
    const handleClick = useCallback(() => {
        console.log(currentLanguage)
        if(currentLanguage === 'kz'){
            return changeLanguage('ru')
        }
        changeLanguage('kz')
    },[currentLanguage])

    return (
        <AppBar position="sticky" style={{
            marginBottom: 30,
            transition: 'box-shadow 0.4s',
            // boxShadow: scrolledToTarget ? boxShadow : 'none',
            boxShadow: scrolledToTarget ?
                '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)' :
                'none',
            background: 'white',
            color: 'black'
        }}>
            <Toolbar className={classNames(classes.toolbar, globalClasses.container)}>
                <Link to='/'>
                    <Typography variant="h5">
                        Bilimdi
                    </Typography>
                </Link>
                <Box display='flex' justifyContent='space-between'>
                    <Link to='/filter'>
                        <Typography variant="h5" style={{marginRight: 30, cursor:"pointer"}}>
                            {useTranslate('Найти грант')}
                        </Typography>
                    </Link>
                    <Typography onClick={handleClick} variant='h5' style={{marginRight: 20, cursor: 'pointer'}}>
                        {useTranslate('Сменить язык')}
                    </Typography>
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