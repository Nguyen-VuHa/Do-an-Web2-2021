import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Register from './Register';


const Auth = () => {
    const match = useRouteMatch();
    const accessToken = localStorage.getItem('accessToken');


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    return (
        <>
            <Switch>
                {
                    accessToken ? 
                        <Redirect exact from={`${match.url}/*`} to="/" />
                    : 
                    <>
                        <Redirect exact from={match.url} to={`${match.url}/register`}/>

                        <Route path={ accessToken ? '' : `${match.url}/register`}>
                            <Header />
                            <Register />
                            <Footer />
                        </Route>

                       
                    </>
                }

                <Route Route path="*">
                    <div>PageNot Found</div>
                </Route>
            </Switch>
        </>
        
    );
};


Auth.propTypes = {

};


export default Auth;
