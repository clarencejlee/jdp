import { createSlice, current } from "@reduxjs/toolkit";
import { createUser } from "../../services";

const data = [
  {
    id: 1,
    title: "App Zee",
    img: "https://randomwordgenerator.com/img/picture-generator/57e6dc4a4355ab14f1dc8460962e33791c3ad6e04e5074417c2f73d6944fc0_640.jpg",
  },
  {
    id: 2,
    title: "Firebase App",
    img: "https://randomwordgenerator.com/img/picture-generator/5fe3d74b4e54b10ff3d8992cc12c30771037dbf85254794e73287ad1944f_640.jpg",
  },
  {
    id: 3,
    title: "Stone Age",
    img: "https://randomwordgenerator.com/img/picture-generator/52e1dd4a4857a414f1dc8460962e33791c3ad6e04e507440752f72d7954bc2_640.jpg",
  },
  {
    id: 4,
    title: "Disney Plus",
    img: "https://randomwordgenerator.com/img/picture-generator/53e1d34b4f56a514f1dc8460962e33791c3ad6e04e5074417c297edd944bc5_640.jpg",
  },
];

export const initialState = {
  user: {},
  items: data,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setUser: (state, action) => {
    //   state.user = action.payload;
    // },
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    removeUser: (state, action) => ({ ...state, user: null }),
    getItems: (state, action) => {
      console.log(`get items`, current(state));
      return current(state);
    },

    // setItems: (state, action) => state.items.unshift(action.payload),
  },
  //   extraReducers: {
  //     [createUser.fulfilled]: (state, action) => {
  //       state.user = action.payload.data;
  //     },
  //     [createUser.rejected]: (state, action) => {
  //       state.user = null;
  //     },
  //   },
});

const {
  setUser: SET_USER,
  removeUser: REMOVE_USER,
  getItems: GET_ITEMS,
  setItems: SET_ITEMS,
} = userSlice.actions;

// export const userSelector = (state) => state.user;
export const userSelector = (state) => {
  console.log("state is here", state.user);
  return state.user;
};

const userReducer = userSlice.reducer;
export default userReducer;

// Actions
export const signinUser = (userData) => async (dispatch) => {
  try {
    await dispatch(SET_USER(userData));
  } catch (error) {
    console.log("loginuser action error", error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await dispatch(REMOVE_USER());
  } catch (error) {
    console.log("logout user action error", error);
  }
};

export const fetchItems = () => async (dispatch) => {
  try {
    await dispatch(GET_ITEMS());
  } catch (error) {
    console.log(`get items action error`, error);
  }
};

// export const setItems = (items) => (dispatch) => {
//   try {
//     dispatch(SET_ITEMS(items));
//   } catch (error) {
//     console.log(`set items action error`, error);
//   }
// };
