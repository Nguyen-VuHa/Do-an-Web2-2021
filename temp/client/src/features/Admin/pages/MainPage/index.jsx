import React from 'react';
import { Helmet } from 'react-helmet';
import './mainpage.scss';
import { Redirect, Route, Switch } from 'react-router';

const MainPage = () => {
    return (
        <>
            <Helmet>
                <title>Admin Manager | CGV Việt Nam</title>
            </Helmet>
            <Switch>
                <Redirect exact from="/admin/thong-ke" to="/admin/thong-ke/view"/>

                <Route path="/admin/thong-ke/view">
                    <div className="sys-statistical">

                    </div>
                </Route>

            </Switch>
        </>
    );
};


MainPage.propTypes = {

};


export default MainPage;
