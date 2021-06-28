import {makeStyles} from "@material-ui/core"


//Global MUI classes
export const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        maxWidth: 'auto',
        [theme.breakpoints.up('md')]: {
            maxWidth: 1280
        },
        boxSizing: 'border-box',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 24px'
    }
}))