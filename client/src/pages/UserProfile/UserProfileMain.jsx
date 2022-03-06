import React, { useContext } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AuthContext } from 'src/contexts/authContext';
import HeaderProfile from './components/HeaderProfile';
import { Divider } from 'src/style-common/Layout.Style';
import TabbarProfile from './components/TabbarProfile';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const PersonalInfomationPage = React.lazy(() => import('./pages/PersonalInfomationPage'));

const routesProfile = [
    { path: '/profile/infomation/:idUser', name: 'User Profile', component: PersonalInfomationPage, exact: true},
]


const UserProfileMain = () => {
    const match = useRouteMatch();

    const { state } = useContext(AuthContext);
    const { fullname } = state;

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{fullname} | BHD STAR CINEPLEX</title>
                </Helmet>
            </HelmetProvider>
            <div className='container'>
                <HeaderProfile />
                <Divider style={{marginTop: '8rem', borderBottom: '1px solid'}}/>
                <TabbarProfile />
                <React.Suspense>
                    <Switch>
                        { routesProfile.map((route, idx) => {
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
                            match.url === '/profile' && <Redirect from={match.url} to="/"/>
                        }
                    </Switch>
                </React.Suspense>
            </div>
        </>
    );
};


export default UserProfileMain;
