import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import {configureStore} from "./app/store/configureStore";
import { Provider } from 'react-redux';
import axios from 'axios'
import ReduxToastr from "react-redux-toastr";
import {SET_AUTHENTICATED} from "./features/auth/authConstants";
import {
    SET_SELECTED_PERIODS,
    SET_SELECTED_BRANDS,
    SET_SELECTED_CATEGORIES, SET_SELECTED_FACTS, SET_SELECTED_MARKETS
} from "./features/dashboard/dashboardConstants";
const store = configureStore();


const rootEl = document.getElementById('root');


axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const access_token = localStorage.access_token;

if (access_token ) {
    store.dispatch({type: SET_AUTHENTICATED, payload:{token: access_token}});
    axios.defaults.headers.common['Authorization'] = `${access_token}`;
    //store.dispatch(getUserData(access_token));
}

if(localStorage.markets){
    store.dispatch({type: SET_SELECTED_MARKETS, payload: {markets: JSON.parse(localStorage.markets)}});
}
if(localStorage.brands){
    store.dispatch({type: SET_SELECTED_BRANDS, payload: {brands: JSON.parse(localStorage.brands)}});
}
if(localStorage.categories){
    store.dispatch({type: SET_SELECTED_CATEGORIES, payload: {categories: JSON.parse(localStorage.categories)}});
}
if(localStorage.periods){
    store.dispatch({type: SET_SELECTED_PERIODS, payload: {periods: JSON.parse(localStorage.periods)}});
}
if(localStorage.facts){
    store.dispatch({type: SET_SELECTED_FACTS, payload: {facts: JSON.parse(localStorage.facats)}});
}

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <ReduxToastr
                    position='bottom-right'
                    transitionIn='fadeIn'
                    transitionOut='fadeOut'
                />
                <App />
            </BrowserRouter>
        </Provider>,
        rootEl
    );
};

if (module.hot) {
    module.hot.accept('./app/layout/App', () => {
        setTimeout(render);
    });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
