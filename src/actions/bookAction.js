import {
    ALL_BOOKS_REQUEST,
    ALL_BOOKS_FAIL,
    ALL_BOOKS_SUCCESS,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_FAIL,
    UPDATE_BOOK_SUCCESS,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAIL,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL} from '../constants/books.js'
import axios from "axios";

export const getAllBooks=()=>async(dispatch)=>{
  try{
    dispatch({ type: ALL_BOOKS_REQUEST })
    const { data } = await axios.get("http://localhost:3800/books/getAllBooks")
     console.log("p",data)
      dispatch({ type: ALL_BOOKS_SUCCESS, payload: data.books });
  }
  catch(error)
  {  console.log("err",error)
    dispatch({ type: ALL_BOOKS_FAIL, payload: error.response.data.message });
  }
}

export const addBook=(body)=>async(dispatch)=>{
  try{
   
    const { data } = await axios.post("http://localhost:3800/books/addBook",body)
     console.log("p",data)
      dispatch({ type: ADD_BOOK_SUCCESS, payload: data });
  }
  catch(error)
  {  console.log("err",error)
    dispatch({ type: ADD_BOOK_FAIL, payload: error.response.data.message });
  }
}

export const updateBook=(id,body)=>async(dispatch)=>{
  try{
      dispatch({ type: UPDATE_BOOK_REQUEST })
    const { data } = await axios.put(`http://localhost:3800/books/updateBook/${id}`,body)
     console.log("i",data)
      dispatch({ type: UPDATE_BOOK_SUCCESS, payload: data });
  }
  catch(error)
  {  console.log("err",error)
    dispatch({ type: UPDATE_BOOK_FAIL, payload: error.response.data.message });
  }
}

export const deleteBook=(id)=>async(dispatch)=>{
  try{
    const { data } = await axios.delete(`http://localhost:3800/books/deleteBook/${id}`)
     console.log("i",data)
      dispatch({ type: DELETE_BOOK_SUCCESS, payload: data });
  }
  catch(error)
  {  console.log("err",error)
    dispatch({ type: DELETE_BOOK_FAIL, payload: error.response.data.message });
  }
}

