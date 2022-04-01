import React, { Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from 'src/contexts/authContext';
import routes, { routesAdmin, routesUser } from 'src/routes';
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
    const { state } = useContext(AuthContext);
    const { isLogin } = state;

    return (
        <div style={{paddingTop: '86px', minHeight: '100vh'}}>
            <Suspense fallback={loading}>
                <Switch>
                    { routes.map((route, idx) => {
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
                    }) }

                    {
                        isLogin && routesUser.map((route, idx) => {
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
                        })
                    }

                    {
                        routesAdmin && routesAdmin.map((route, idx) => {
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
                        })
                    }
                    <Redirect from="/" to="/" />
                </Switch>
            </Suspense>
        </div>
    );
};


export default TheContent;
