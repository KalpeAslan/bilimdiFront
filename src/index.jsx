import ReactDom from 'react-dom'
import 'scss/font.scss'
import './index.scss'
import React from "react"
import Blog from 'pages/blog/index.jsx'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Calc from 'pages/calc/index.jsx'
import Nav from 'cpm/nav/index.jsx'
import {Container} from "@material-ui/core"

function App() {
    return <React.Fragment>
        <Nav />
        <Container>
            <BrowserRouter >
                <Switch>
                    <Route exact path={'/'}>
                        <Calc></Calc>
                    </Route>
                    <Route path={'/blog'}>
                        <Blog/>
                    </Route>
                </Switch>
            </BrowserRouter >
        </Container>
    </React.Fragment>
}



ReactDom.render(<App/>,document.querySelector('#app'))