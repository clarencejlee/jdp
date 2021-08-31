import { combineReducers } from "redux";
import dataReducer from "../../features/dashboard/dashboardReducer";
import modalReducer from "../../features/modals/modalReducer";
import navReducer from "../../features/nav/navReducer"
import {reducer as ToastrReducer} from 'react-redux-toastr';
import asyncReducer from "../../features/async/asyncReducer";
import authReducer from "../../features/auth/authReducer";

const rootReducer = combineReducers({
    data: dataReducer,
    modals: modalReducer,
    auth: authReducer,
    nav: navReducer,
    toastr: ToastrReducer,
    async: asyncReducer,
});

export default rootReducer;
