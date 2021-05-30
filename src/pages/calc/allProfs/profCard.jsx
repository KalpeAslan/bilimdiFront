import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ({prof, subject,click}) {
    const classes = useStyles();
    const {code, name, min} = prof
    return (
        <Card className={classes.root} variant="outlined" onClick={click}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {code}
                </Typography>
                <Typography variant="body2" component="p">
                    {name}
                </Typography>
                <Typography color="textSecondary" >
                    Предметы {subject}
                    <br/>
                    Минимальный балл {min}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Узнать больше</Button>
            </CardActions>
        </Card>
    );
}