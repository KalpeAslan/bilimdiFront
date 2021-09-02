import React, {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Box,
    Drawer,
    Divider,
    List,
    ListItemIcon,
    ListItemText,
    ListItem,
    useMediaQuery,
    useTheme,
    Icon,
    FormGroup,
    FormControlLabel, Switch,
} from "@material-ui/core"
import {useScroll} from "../../hooks/useScroll"
import {useGlobalClasses} from "../../hooks/useGlobalClasses"
import classNames from "classnames"
import {useLocale, useTranslate} from "../../hooks/useLocale"
import MailIcon from '@material-ui/icons/Mail'
import Button from "@material-ui/core/Button"
import InboxIcon from '@material-ui/icons/Inbox'
import MenuIcon from '@material-ui/icons/Menu'
import InfoIcon from '@material-ui/icons/Info'
import SearchIcon from '@material-ui/icons/Search'


const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    list: {
        width: theme.breakpoints.down('sm') ? '80vw' : 250,
    },
    fullList: {
        width: 'auto',
    },
}))

const navItems = [
    {
        name: 'Найти грант',
        link: '/filter'
    },
    {
        name: 'О проекте',
        link: '/'
    }
]

const languages = {
    kz: {
        name: 'Қазақ тілі',
        value: 'kz'
    },
    ru: {
        name: 'Русский язык',
        value: 'ru'
    }
}
export default function Nav() {
    const classes = useStyles()
    const globalClasses = useGlobalClasses()
    const scrolledToTarget = useScroll(0)
    const {currentLanguage, changeLanguage} = useLocale()
    const handleClick = useCallback(() => {
        if (currentLanguage === 'kz') {
            return changeLanguage('ru')
        }
        changeLanguage('kz')
    }, [currentLanguage])
    const theme = useTheme()
    const isSm = !useMediaQuery(theme.breakpoints.up('sm'))

    const [isShowDrawer, setIsShowDrawer] = useState(false)

    const list = (anchor) => (
        <div
            className={classNames(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={() => setIsShowDrawer(false)}
            onKeyDown={() => setIsShowDrawer(false)}
        >
            <List>
                {navItems.map(({name, link}, index) => (
                    <Link to={link} key={name + index}>
                        <ListItem button>
                            <ListItemIcon>
                                {index % 2 === 0 ? <SearchIcon/> : <InfoIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={useTranslate(name)}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem onClick={event => event.stopPropagation()}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={currentLanguage === 'kz'}
                                    onChange={handleLanguageSwitcher}
                                    name="kz"
                                    color="primary"
                                />
                            }
                            label={currentLanguage === languages.kz.value ? languages.kz.name : languages.ru.name}
                        />
                    </FormGroup>
                </ListItem>
            </List>
        </div>
    )


    const handleLanguageSwitcher = (event) => {
        changeLanguage(event.target.checked ? 'kz' : 'ru')
    }

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
                <Link to="/">
                    <Typography variant="h5">
                        Bilimdi
                    </Typography>
                </Link>
                {!isSm && <Box display="flex" justifyContent="space-between">
                    <Link to="/filter">
                        <Typography variant="h5" style={{marginRight: 30, cursor: "pointer"}}>
                            {useTranslate('Найти грант')}
                        </Typography>
                    </Link>
                    <Typography onClick={handleClick} variant="h5" style={{marginRight: 20, cursor: 'pointer'}}>
                        {useTranslate('Сменить язык')}
                    </Typography>
                </Box>}
                {isSm && <React.Fragment key={'burger-menu'}>
                    <Button onClick={() => setIsShowDrawer(true)}>
                        <MenuIcon/>
                    </Button>
                    <Drawer open={isShowDrawer} onClose={() => setIsShowDrawer(false)}>
                        {list('left')}
                    </Drawer>
                </React.Fragment>}
            </Toolbar>
        </AppBar>
    )
}