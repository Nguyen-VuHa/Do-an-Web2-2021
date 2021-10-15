import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import Header from './components/Header';
import HomePage from './features/HomePage';
import Footer from './components/Footer';
import Auth from './features/Auth';
import LoadingPage from './components/LoadingPage';
import PageNotFound from './components/PageNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './contants/loginSlice';


function App() {
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.isLogin);

    useEffect(() => {
        if(accessToken) {
            dispatch(login());
        }
    }, [accessToken]);

    return (
        <Suspense fallback={<LoadingPage />} >
            {/* <ToastMessage autoDeleteInterval={3500}/> */}
            <LoadingPage />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Header />
                        <HomePage />
                        <Footer />
                    </Route>

                    {
                        isLogin ? '' :   <Route path="/auth">
                                            <Auth />
                                        </Route>
                    }

                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
