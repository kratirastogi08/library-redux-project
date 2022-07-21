import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {getAllBooksReducer,addBookReducer,updateBookReducer,deleteBookReducer} from './reducer/bookReducer.js'

const reducer = combineReducers({books:getAllBooksReducer,addBook:addBookReducer,updateBook:updateBookReducer, deleteBook:deleteBookReducer})
const middleware = [thunk];
const initialState={}

  const store = createStore(reducer,initialState,
        composeWithDevTools(applyMiddleware(...middleware)))

export default store;