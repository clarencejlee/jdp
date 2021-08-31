import {
    SET_SELECTED_MARKETS,
    SET_SELECTED_BRANDS,
    SET_SELECTED_CATEGORIES,
    SET_SELECTED_FACTS,
    SET_SELECTED_PERIODS,
    FETCH_BRANDS,
    FETCH_CATEGORIES,
    FETCH_FACTS,
    FETCH_MARKETS,
    FETCH_PERIODS, FETCH_CUSTOM_QUERY_DATA, REMOVE_UNSELECTED
} from './dashboardConstants';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {asyncActionFinish, asyncActionStart} from "../async/asyncActions";
import {b64toBlob} from '../../app/common/util/helpers'
import {logout} from "../auth/authActions";

const FileDownload = require('js-file-download');


export const getCustomQueryData = (query) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        axios
            .get(`/data/query/${query}`)
            .then((res) => {
                dispatch({ type: FETCH_CUSTOM_QUERY_DATA,
                    payload: { query: res.data } });
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                console.log(err)
                toastr.error('Error!', 'Not valid statement');
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);
    }
};

export const customQueryCsvExport = (query) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        axios
            .get(`/data/query/${query}/csv/export`)
            .then((res) => {
                FileDownload(res.data, 'mc_panel - ' + new Date().getTime() + '.csv')
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                console.log(err)
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);
    }
};

export const getMarketsForDashboard = (page, size) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        axios
            .get(`/markets?page=${page}&size=${size}`)
            .then((res) => {

                dispatch({ type: FETCH_MARKETS,
                    payload: { markets: res.data.markets, page: page, size:size } });
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                console.log(err)
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);
    }
};

export const getCategoriesForDashboard = (page, size) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        axios
            .get(`/categories?page=${page}&size=${size}`)
            .then((res) => {
                dispatch({ type: FETCH_CATEGORIES,
                    payload: { categories: res.data.categories, page: page, size:size } });
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                console.log(err)
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);

    }
};

export const getBrandsForDashboard = (page, size) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        axios
            .get(`/brands?page=${page}&size=${size}`)
            .then((res) => {
                dispatch({ type: FETCH_BRANDS,
                    payload: { brands: res.data.brands, page: page, size:size } });
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);

    }
};

export const getPeriodsForDashboard = (page, size) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        axios
            .get(`/periods?page=${page}&size=${size}`)
            .then((res) => {
                dispatch({ type: FETCH_PERIODS,
                    payload: { periods: res.data.periods, page: page, size:size } });
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                console.log(err)
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);

    }
};

export const getFactsForDashboard = (page, size) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        axios
            .get(`/facts?page=${page}&size=${size}`)
            .then((res) => {
                dispatch({ type: FETCH_FACTS,
                    payload: { facts: res.data.facts, page: page, size:size } });
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                console.log(err)
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);

    }
};

export const setSelectedMarkets = (markets) => async (
    dispatch,
    getState
) => {
    try {
        setSelectedStorage("markets", markets);
        dispatch({type: SET_SELECTED_MARKETS, payload: {markets}});
    } catch (error) {
        console.log(error);

    }
};

export const setSelectedBrands = (brands) => async (
    dispatch,
    getState
) => {
    try {
        //setSelectedStorage("brands", brands);
        dispatch({type: SET_SELECTED_BRANDS, payload: {brands}});
    } catch (error) {
        console.log(error);

    }
};

export const setSelectedCategories = (categories) => async (
    dispatch,
    getState
) => {
    try {
        //setSelectedStorage("categories", categories);
        dispatch({type: SET_SELECTED_CATEGORIES, payload: {categories}});
    } catch (error) {
        console.log(error);

    }
};

export const setSelectedPeriods = (periods) => async (
    dispatch,
    getState
) => {
    try {
        setSelectedStorage("periods", periods);
        dispatch({type: SET_SELECTED_PERIODS, payload: {periods}});
    } catch (error) {
        console.log(error);

    }
};

export const setSelectedFacts = (facts) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({type: SET_SELECTED_FACTS, payload: {facts}});
    } catch (error) {
        console.log(error);

    }
};

export const removeUnselected = () => async (
    dispatch,
    getState
) => {
    try {
        dispatch({type: REMOVE_UNSELECTED});
    } catch (error) {
        console.log(error);

    }
};

export const exportCsv = (params) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        axios
            .get(`/data/csv/export?${params}`)
            .then((res) => {
                FileDownload(res.data, 'mc_panel - ' + new Date().getTime() + '.csv')
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                console.log(err)
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);

    }
};

export const uploadCsv = (file) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        let formData = new FormData();
        formData.append("file", file);
        axios
            .post(`/data/csv/upload`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }})
            .then((res) => {
                toastr.success('Success!', 'CSV File uploaded successfully');
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                console.log(err)
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);

    }
};

export const sendFeedback = (file, message) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(asyncActionStart());
        let formData = new FormData();
        if (file !== undefined) {
        let image = b64toBlob(file);
        formData.append("feedback.jpg", image);
        }
        formData.append("message", message);
        axios
            .post(`/feedback`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
            .then((res) => {
                toastr.success('Success!', 'Feedback successfully sent');
                dispatch(asyncActionFinish());
            })
            .catch((err) => {
                console.log(err)
                if(err && err.response && err.response.status === 401){
                    dispatch(logout())
                }
                toastr.error('Error!', 'Could not send feedback. Please try again.');
                dispatch(asyncActionFinish());
            });
    } catch (error) {
        console.log(error);
        toastr.error('Error!', 'Could not send feedback. Please try again.');
        dispatch(asyncActionFinish());

    }
};


// local storage functions
const setSelectedStorage = (type, selected) =>{
    localStorage.setItem(type, JSON.stringify(selected));
}
