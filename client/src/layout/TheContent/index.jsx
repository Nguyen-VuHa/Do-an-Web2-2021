import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from 'src/routes';
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
    return (
        <div style={{paddingTop: '10vh'}}>
            <Suspense fallback={loading}>
                <Switch>
                    {routes.map((route, idx) => {
                        return route.component && (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                    <route.component {...props} />
                                )} 
                            />
                        )
                    })}
                    <Redirect from="/" to="/" />
                </Switch>
            </Suspense>
        </div>
    );
};


export default TheContent;
