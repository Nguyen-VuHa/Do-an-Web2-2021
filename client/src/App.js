import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import LoadingPage from './components/LoadingPage';
import PageNotFound from './components/PageNotFound';
import TraillerMovie from './components/TraillerMovie';
import { login } from './contants/loginSlice';
import AdminPage from './features/Admin';
import Auth from './features/Auth';
import HomePage from './features/HomePage';
import UserProfile from './features/UserProfile';


function App() {
    const accessToken = localStorage.getItem('accessToken');
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.isLogin);

    useEffect(() => {
        if(accessToken) {
            dispatch(login());
        }
    }, [accessToken, dispatch]);

    return (
        <Suspense fallback={<LoadingPage />} >
            {/* <ToastMessage autoDeleteInterval={3500}/> */}
            <LoadingPage />
            <TraillerMovie />
            <BrowserRouter>
                <Switch>
                    {
                        isLogin && userInfo.role === '0' 
                        ? 
                        <>
                            <Redirect exact from="/" to="/admin"/>
                            <Route path="/admin">
                                <AdminPage />
                            </Route>
                        </>
                        : 
                        <>
                            <Route exact path="/">
                                <Header />
                                <HomePage />
                                <Footer />
                            </Route>
                            <Route path="/my-profile">
                                <Header />
                                <UserProfile />
                                <Footer />
                            </Route>
                            {
                                isLogin ? '' :   <Route path="/auth">
                                                    <Auth />
                                                </Route>
                            }
                        </>
                        
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
