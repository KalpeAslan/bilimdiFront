import ReactDom from 'react-dom'
import React from "react"
import Blog from 'pages/blog'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Calc from 'pages/calc/index.jsx'
import Nav from 'cpm/nav/index.jsx'
import {Box, CssBaseline, makeStyles} from "@material-ui/core"
import {Provider} from "react-redux"
import store from 'store/index'
import {ThemeProvider} from "@material-ui/core"
import {ClassesProvider} from "./contexts/ClassesProvider"
import theme from "./themes/main"
import {useStyles} from "./themes/classes"
import Filter from 'pages/filter'


function App() {
    const classes = useStyles()
    return <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ClassesProvider value={classes}>
                <CssBaseline/>
                    <BrowserRouter>
                        <Nav/>
                        <Box className={classes.container}>
                        <Switch>
                            <Route exact path={'/'}>
                                <Filter/>
                            </Route>
                            <Route path='/calc'>
                                <Calc></Calc>
                            </Route>
                        </Switch>
                        </Box>
                    </BrowserRouter>
            </ClassesProvider>
        </ThemeProvider>
    </Provider>
}


ReactDom.render(<App/>, document.querySelector('#app'))