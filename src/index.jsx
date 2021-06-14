import ReactDom from 'react-dom'
import React from "react"
import Blog from 'pages/blog'
import Universitites from 'pages/universities'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Calc from 'pages/calc/index.jsx'
import Nav from 'cpm/nav/index.jsx'
import {Container, CssBaseline} from "@material-ui/core"
import {Provider} from "react-redux"
import store from 'store/index'
import {ThemeProvider} from "@material-ui/core"
import theme from "./themes/main"

function App() {
    return <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Nav/>
            <Container>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/'}>
                            <Calc></Calc>
                        </Route>
                        <Route path='/blog'>
                            <Blog/>
                        </Route>
                        <Route exact path={'/universities'}>
                            <Universitites/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Container>
        </ThemeProvider>

    </Provider>
}


ReactDom.render(<App/>, document.querySelector('#app'))