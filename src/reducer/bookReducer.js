import {
    ALL_BOOKS_REQUEST,
    ALL_BOOKS_FAIL,
    ALL_BOOKS_SUCCESS,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAIL,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_FAIL,
    UPDATE_BOOK_SUCCESS,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,CLEAR_MESSAGE} from '../constants/books.js'

 export const getAllBooksReducer=(state={},action)=>{
     switch (action.type) {
         case ALL_BOOKS_REQUEST:
             
             return{
                 loading:true
             }
             case ALL_BOOKS_SUCCESS:
              return{
                 loading:false,
                 books:action.payload
             }
             case ALL_BOOKS_FAIL:
              return{
                  ...state,
                 loading:false,
                 error:action.payload
             }
     
         default:
             return state;
     }
 }

 export const addBookReducer=(state={},action)=>{
     switch (action.type) {
             case ADD_BOOK_SUCCESS:
              return{
                 success:action.payload.success,
                 message:action.payload.message
             }
             case CLEAR_MESSAGE:
             return{
                 message:null
             }
             case ADD_BOOK_FAIL:
              return{
                  ...state,
                 error:action.payload
             }
     
         default:
             return state;
     }
 }

 export const updateBookReducer=(state={},action)=>{
     switch (action.type) {
          case UPDATE_BOOK_REQUEST:
             return{
                 loading:true
             }
             case UPDATE_BOOK_SUCCESS:
             console.log(action.payload.message)
              return{
                  loading:false,
                 success:action.payload.success,
                 message:action.payload.message
             }
              case CLEAR_MESSAGE:
             return{
                 ...state,
                 message:null,
                 
             }
             case UPDATE_BOOK_FAIL:
              return{
                  ...state,
                  loading:false,
                 error:action.payload
             }
     
         default:
             return state;
     }
 }

 export const deleteBookReducer=(state={},action)=>{
     switch (action.type) {
             case DELETE_BOOK_SUCCESS:
              return{
                 success:action.payload.success,
             }
             case DELETE_BOOK_FAIL:
              return{
                  ...state,
                 error:action.payload
             }
     
         default:
             return state;
     }
 }