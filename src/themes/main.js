import {createMuiTheme} from '@material-ui/core/styles'
import fonts from "./fonts"
import {ruRU} from '@material-ui/core/locale'

const theme = createMuiTheme({
    mixins: {
        size: (width, height = width) => {
            return {
                width: width,
                height: height
            }
        },
    },
    palette: {
        background: {
            default: 'white'
        }
    },
    breakpoints: {
        keys: [
            'md',
            'sm'
        ],
        values: {
            'md': 880,
            'sm': 600
        }
    },
    typography: {
        button: {
            textTransform: 'none',
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.25rem',
        },
        subtitle1: {
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
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        h5: {
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.5rem',
        },
        h4: {
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
            fontSize: '2.4rem'
        },
        h2: {
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '3.4rem',
            fontWeight: 500,
        },
        body2: {
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        body1: {
            fontFamily: '"FuturaPT", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1.2rem'
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
                a: {
                    textDecoration: 'none',
                    color: 'inherit'
                },
            },
        },
    }
}, ruRU)

export default theme