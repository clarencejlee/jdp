import {createReducer} from '../../app/common/util/reducerUtils'

import {
    FETCH_CUSTOM_QUERY_DATA,
    FETCH_PERIODS,
    FETCH_MARKETS,
    FETCH_FACTS,
    FETCH_CATEGORIES,
    FETCH_BRANDS,
    SET_SELECTED_MARKETS,
    SET_SELECTED_BRANDS,
    SET_SELECTED_CATEGORIES,
    SET_SELECTED_PERIODS,
    SET_SELECTED_FACTS,
    REMOVE_UNSELECTED
} from './dashboardConstants';

const initialState = {
    query: [],
    markets: [],
    categories: [],
    brands: [],
    periods: [],
    facts: [],
    items: [],
    page: 0,
    size: 5
}


const checkAllSelected = (state) => {
    return state.markets.length > 0 &&
        state.categories.length > 0 &&
        state.brands.length > 0 &&
        state.periods.length > 0 &&
        state.facts.length > 0;

}

const fetchCustomQueryData = (state, payload) => {
    return {
        ...state,
        query: [...payload.query]
    }
}
const fetchMarkets = (state, payload) => {
    return {
        ...state,
        items: [...payload.markets],
        page: payload.page,
        size: payload.size
    }
}

const fetchCategories= (state, payload) => {
    return {
        ...state,
        items: [...payload.categories],
        page: payload.page,
        size: payload.size
    }
}

const fetchBrands = (state, payload) => {
    return {
        ...state,
        items: [...payload.brands],
        page: payload.page,
        size: payload.size
    }
}

const fetchPeriods = (state, payload) => {
    return {
        ...state,
        items: [...payload.periods],
        page: payload.page,
        size: payload.size
    }
}

const fetchFacts = (state, payload) => {

   /* let newItems = [];
    let oldItems = [];
    if (state.items.length===0) {
        oldItems = [...payload.facts]
    }else{
        oldItems = [...state.items];
        // update old
         oldItems = oldItems.map(item => {
            let item2 = payload.facts.find(i2 => i2.id === item.id);
             return item2 ? { ...item, ...item2 } : item;
        });

         //find new ones
         newItems = payload.facts.map(item => {
             let item2 = oldItems.find(i2 => i2.id === item.id);
             return item2 ? { ...item, ...item2 } : item;
         });


         //append it
         oldItems = [...oldItems, ...newItems]
    }

    return {
        ...state,
        items: [...oldItems],
        page: payload.page,
        size: oldItems.length
    }*/

    return {
        ...state,
        items: [...payload.facts],
        page: payload.page,
        size: payload.facts.length
    }
}

const setSelectedBrands = (state, payload) => {
    const newState =  {...state, brands:[...payload.brands]};
    let allSelected= checkAllSelected(newState);
    return {
        ...newState,
        allSelected: allSelected,
    }
}
const setSelectedCategories = (state, payload) => {
    const newState =  {...state, categories:[...payload.categories]};
    let allSelected= checkAllSelected(newState);
    return {
        ...newState,
        allSelected: allSelected,
    }
}

const setSelectedPeriods = (state, payload) => {
    const newState =  {...state, periods:[...payload.periods]};
    let allSelected= checkAllSelected(newState);
    return {
        ...newState,
        allSelected: allSelected,
    }
}
const setSelectedFacts = (state, payload) => {
    const newState =  {...state, facts:[...payload.facts]};
    let allSelected= checkAllSelected(newState);
    return {
        ...newState,
        allSelected: allSelected,
    }
}
const setSelectedMarkets = (state, payload) => {
    const newState =  {...state, markets:[...payload.markets]};
    let allSelected= checkAllSelected(newState);
    return {
        ...newState,
        allSelected: allSelected,
    }
}

const removeUnselected = (state, payload) => {
    const markets = [...state.markets];
    const categories = [...state.categories];
    const brands = [...state.brands];
    let isCatSelected = false;
    let newCategories = [];
        for (let category of categories){
            for (let market of markets) {
                if(category.market.id === market.id){
                    isCatSelected= true;
                }
            }
            if(isCatSelected) {
                newCategories.push(category);
            }
    }
    setSelectedStorage("categories", newCategories);
    let isBrandSelected = false;
    let newBrands = [];
    for (let brand of brands){
        for (let category of newCategories) {
            if(brand.category.id === category.id){
                isBrandSelected= true;
            }
        }
        if(isBrandSelected) {
            newBrands.push(brand);
        }
    }
    setSelectedStorage("brands", newBrands);
    const newState = {
        ...state,
        categories: newCategories,
        brands: newBrands
    };
    let allSelected= checkAllSelected(newState);
    return {
        ...newState,
        allSelected: allSelected,
    }
}

export default createReducer(initialState, {
    [FETCH_CUSTOM_QUERY_DATA]: fetchCustomQueryData,
    [FETCH_MARKETS]: fetchMarkets,
    [FETCH_PERIODS]: fetchPeriods,
    [FETCH_FACTS]: fetchFacts,
    [FETCH_CATEGORIES]: fetchCategories,
    [FETCH_BRANDS]: fetchBrands,
    [SET_SELECTED_MARKETS]: setSelectedMarkets,
    [SET_SELECTED_BRANDS]: setSelectedBrands,
    [SET_SELECTED_CATEGORIES]: setSelectedCategories,
    [SET_SELECTED_PERIODS]: setSelectedPeriods,
    [SET_SELECTED_FACTS]: setSelectedFacts,
    [REMOVE_UNSELECTED]: removeUnselected

})


// local storage functions
const setSelectedStorage = (type, selected) =>{
    localStorage.setItem(type, JSON.stringify(selected));
}

