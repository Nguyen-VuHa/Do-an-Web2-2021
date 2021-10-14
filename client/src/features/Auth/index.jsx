import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Register from './Register';


const Auth = () => {
    const match = useRouteMatch();

    return (
        <>
            <Switch>
                <Redirect exact from={match.url} to={`${match.url}/register`}/>
                
                <Route path={`${match.url}/register`}>
                    <Header />
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
