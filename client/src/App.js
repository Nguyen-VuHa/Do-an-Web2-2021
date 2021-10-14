import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/Header';
import HomePage from './features/HomePage';

function App() {
    return (
        <Suspense fallback={<div>Loading. . .</div>} >
            {/* <ToastMessage autoDeleteInterval={3500}/> */}
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Header />
                        <HomePage />
                    </Route>
                    
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
