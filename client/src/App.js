import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FirstLoading from 'src/components/FirtLoading';
import TrailerMovie from 'src/components/TrailerMovie';
import './App.scss';
import { AuthContextProvider } from './contexts/authContext';
import { TrailerContextProvider } from './contexts/trailerContenxt';
import GlobalStyle from './GlobalStyle';

const TheLayout = React.lazy(() => import('./layout/TheLayout'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound'));

const loading = (
    <div className="pt-3 text-center">
       <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

function App() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timeOut = setTimeout(() => {
            setIsLoading(false);    
        }, 1000);

        return () => clearTimeout(timeOut);
    }, []);
    
    return (
        <AuthContextProvider>
            <TrailerContextProvider>
                { isLoading ? <FirstLoading /> : '' }
                <GlobalStyle />
                <ToastContainer theme="colored" style={{zIndex: 999999999}}/>
                <TrailerMovie />
                <React.Suspense fallback={loading}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" component={TheLayout} />
                        </Switch>
                    </BrowserRouter>
                </React.Suspense>
            </TrailerContextProvider>
            {/* <Suspense fallback={<LoadingPage />} >
                <LoadingPage />
                <TraillerMovie />
                <ToastContainer theme="colored" style={{zIndex: 999999999}}/>
                <BrowserRouter>
                    <Switch>
                        {
                            isLogin ? 
                                role === '0' && <Redirect exact from="/" to="/admin"/>
                            :   <Route path="/auth">
                                    <Auth isLogin={isLogin}/>
                                </Route> 
                        }
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
                        <Route path="/cinema-system">
                            <Header />
                            <CinemaSystem />
                            <Footer />
                        </Route>
                        <Route path="/movie-current">
                            <Header />
                            <MovieDetail />
                            <Footer />
                        </Route>
                        <Route path="/comming-soon">
                            <Header />
                            <MovieDetail />
                            <Footer />
                        </Route>

                        <Route path="/admin">
                            <AdminPage />
                        </Route>
                        
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </BrowserRouter>
                
                <div className={scrollHeight >= 1000 ? "btn-on-top show" : "btn-on-top"} onClick={() => handleToTop()}>
                    <i className="fad fa-angle-up"></i>
                </div>
            </Suspense> */}
        </AuthContextProvider>

    );
}

export default App;
