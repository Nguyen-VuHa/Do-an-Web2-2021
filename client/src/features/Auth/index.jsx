import React from 'react';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Register from './Register';


const Auth = ({ login }) => {
    const match = useRouteMatch();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, []);

    return (
        <>
            <Switch>
                <Redirect exact from={match.url} to={`${match.url}/register`}/>
                
                <Route path={`${match.url}/register`}>
                    <Header login={login}/>
                    <Register />
                    <Footer />
                </Route>

                <Route path="*">
                    <div>Page Not Found</div>
                </Route>
            </Switch>
        </>
        
    );
};


Auth.propTypes = {

};


export default Auth;