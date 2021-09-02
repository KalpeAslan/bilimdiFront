import ReactDom from 'react-dom'
import React from "react"
import {Route ,HashRouter } from 'react-router-dom'
import {CssBaseline} from "@material-ui/core"
import {Provider} from "react-redux"
import {store} from 'store/index'
import {ThemeProvider} from "@material-ui/core"
import {ClassesProvider} from "./contexts/ClassesProvider"
import {LocaleProvider} from "./contexts/LocaleProvider"
import theme from "./themes/main"
import {Filter} from "./pages/filter/Filter"
import {Skeleton} from "@material-ui/lab"
import {Consultation} from "./pages/consultation/Consultation"
import { DIProvider } from './contexts/DIcontainerProvider'

const Nav = React.lazy(() => import('cpm/nav'))


function App() {
    return <Provider store={store}>
        <DIProvider>
        <ThemeProvider theme={theme}>
            <ClassesProvider>
                <LocaleProvider>
                <CssBaseline/>
                    <HashRouter>
                        <React.Suspense fallback={<Skeleton width='100%' height={70}/>}>
                            <Nav/>
                        </React.Suspense>
                        <Route exact path={'/'}>
                            <Consultation/>
                        </Route>
                        <Route exact path='/filter'>
                            <Filter/>
                        </Route>
                        {/*<Route exact path='/filter'>*/}
                        {/*    <Filter/>*/}
                        {/*</Route>*/}
                        <React.Suspense fallback={<Skeleton width='100%' height={70}></Skeleton>}>
                            {/*<BottomBanner/>*/}
                        </React.Suspense>
                    </HashRouter>
                </LocaleProvider>
            </ClassesProvider>
        </ThemeProvider>
        </DIProvider>
    </Provider>
}


ReactDom.render(<App/>, document.querySelector('#app'))