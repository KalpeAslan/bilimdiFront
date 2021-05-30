import ReactDom from 'react-dom'
import React from "react"
import Blog from 'pages/blog/index.jsx'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Calc from 'pages/calc/index.jsx'
import Nav from 'cpm/nav/index.jsx'
import {Container} from "@material-ui/core"
import {createGlobalStyle} from 'styled-components'
import robotoBlack from 'fonts/Roboto-Black.ttf'
import {Provider} from "react-redux"
import store from 'store/index'
const GlobalStyles  = createGlobalStyle`
    * {
      margin: 0;
      @font-face {
        font-family: Roboto-Black;
        src: url(${robotoBlack});
      }
      font-family: Roboto-Black;
    }
`;


function App() {
    return <Provider store={store}>
        <GlobalStyles/>
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
    </Provider>
}



ReactDom.render(<App/>,document.querySelector('#app'))