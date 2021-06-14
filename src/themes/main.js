import {createMuiTheme} from '@material-ui/core/styles'
import fonts from "./fonts"
import {ruRU} from '@material-ui/core/locale'

const theme = createMuiTheme({
    mixins: {
        size: (width, height = width) => {
            return {
                width: `${width}px`,
                height: `${height}px`
            }
        }
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        subtitle1: {
            color: '#333333',
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        subtitle2: {
            color: '#918da5',
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h6: {
            color: '#333333',
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        h5: {
            color: '#333333',
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        h4: {
            color: '#333333',
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '2rem',
            fontWeight: 500,
        },
        body2: {
            color: '#333333',
        },
        caption: {
            color: '#6D778E',
            fontSize: '0.875rem',
            fontWeight: 400
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': fonts,
                '*': {
                    margin: 0,
                    padding: 0,
                },
                body: {
                    background: 'white'
                },
                a: {
                    textDecoration: 'none',
                    color: 'inherit'
                },
            },
        },
    }
}, ruRU)

export default theme