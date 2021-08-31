import {createReducer} from '../../app/common/util/reducerUtils'
import { DRAWER_OPEN, DRAWER_CLOSE } from './navConstants';

const initialState = {
    drawerOpen:true
};

const openDrawer = (state) => {
    return {
        ...state,
        drawerOpen:true
    }
}

const closeDrawer = (state) => {
    return {
        ...state,
        drawerOpen: false
    }
}

export default createReducer(initialState, {
    [DRAWER_OPEN]: openDrawer,
    [DRAWER_CLOSE]: closeDrawer
})
