import ReactDom from 'react-dom'
import React from "react"
import {Route, BrowserRouter ,HashRouter } from 'react-router-dom'
import Calc from 'pages/calc/index.jsx'
import {Box, CssBaseline} from "@material-ui/core"
import {Provider} from "react-redux"
import store from 'store/index'
import {ThemeProvider} from "@material-ui/core"
import {ClassesProvider} from "./contexts/ClassesProvider"
import {LocaleProvider} from "./contexts/LocaleProvider"
import theme from "./themes/main"
import {useStyles} from "./themes/classes"
import Filter from 'pages/filter'
import {Skeleton} from "@material-ui/lab"


const Nav = React.lazy(() => import('cpm/nav'))
const BottomBanner = React.lazy(() => import('cpm/bottomBanner'))

function App() {
    const classes = useStyles()
    return <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ClassesProvider value={classes}>
                <LocaleProvider>
                <CssBaseline/>
                    <BrowserRouter>
                        <React.Suspense fallback={<Skeleton width='100%' height={70}/>}>
                            <Nav/>
                        </React.Suspense>
                        <Box className={classes.container}>
                        <HashRouter>
                            <Route exact path={'/'}>
                                <Filter/>
                            </Route>
                            <Route path='/calc'>
                                <Calc></Calc>
                            </Route>
                        </HashRouter>
                        </Box>
                        <React.Suspense fallback={<Skeleton width='100%' height={70}></Skeleton>}>
                            <BottomBanner/>
                        </React.Suspense>
                    </BrowserRouter>
                </LocaleProvider>
            </ClassesProvider>
        </ThemeProvider>
    </Provider>
}


ReactDom.render(<App/>, document.querySelector('#app'))