import React from 'react'
import {Box, makeStyles, Theme} from "@material-ui/core";
import pencilImg from 'assets/images/banner/pencil.png'
import graduation from 'assets/images/banner/graduation.png'
import {Button} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: 60,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: theme.palette.primary.main,
        padding: theme.spacing(20 / 8),
        color: 'white',
        textAlign: 'center',
        ['&::before']: {
            content: "''",
            display: 'inline-block',
            width: 45,
            height: 45,
            background: `url(${pencilImg}) center / 45px no-repeat`,
            position: 'absolute',
            bottom: 0,
            left: 10
        },
        ['&::after']: {
            content: "''",
            display: 'inline-block',
            width: 160,
            height: 160,
            background: `url(${graduation}) center / 160px no-repeat`,
            position: 'absolute',
            bottom: 5,
            right: 0
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            flexDirection: 'column',
            ['&::before']: {
                display: 'none'
            },
            ['&::after']: {
                display: 'none',
            },
        }
    },
    button: {
        background: 'black',
        color: 'white',
        borderRadius: 10,
        padding: 8
    }
}))

export default function (): React.FC{
    const classes = useStyles()
    return <Box className={classes.root}>
        <h3>Получи скидку на конусультация в 50%!</h3>
        <Button className={classes.button}>Подробнее</Button>
    </Box>
}