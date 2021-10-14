import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/Header';
import HomePage from './features/HomePage';
import Footer from './components/Footer';
import Auth from './features/Auth';


function App() {
    return (
        <Suspense fallback={<div>Loading. . .</div>} >
            {/* <ToastMessage autoDeleteInterval={3500}/> */}
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Header />
                        <HomePage />
                        <Footer />
                    </Route>

                    <Route path="/auth">
                        <Auth />
                    </Route>

                    <Route path="*">
                        <div>Page Not Found</div>
                    </Route>
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
