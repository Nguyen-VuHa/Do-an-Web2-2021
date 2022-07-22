import React, { useEffect, useState } from 'react';
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
const BookTicketMain = React.lazy(() => import('./pages/BookTickets'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound'));

const loading = (
    <div className="pt-3 text-center">
       <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

function App() {

    const [scrollHeight, setScrollHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timeOut = setTimeout(() => {
            setIsLoading(false);    
        }, 1000);

        return () => clearTimeout(timeOut);
    }, []);

    useEffect(() => {
        const getScrollHeight = () => {
            setScrollHeight(window.pageYOffset)
        } 

        window.addEventListener('scroll', getScrollHeight);

        return () => window.removeEventListener('scroll', getScrollHeight)
    }, []);
    
    const handleToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }

    //console.log(213);
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
                            {
                                localStorage.getItem('accessToken') ? <Route path="/book-ticket" component={BookTicketMain} /> : ''
                            }

                            <Route path="/" component={TheLayout} />
                        </Switch>
                    </BrowserRouter>
                </React.Suspense>
            </TrailerContextProvider>
            <div className={scrollHeight >= 1000 ? "btn-on-top show" : "btn-on-top"} onClick={() => handleToTop()}>
                <i className="fad fa-angle-up"></i>
            </div>
        </AuthContextProvider>

    );
}

export default App;
