import React, { Fragment, useEffect,useState } from 'react'
import BookCard from './BookCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import {getAllBooks} from '../actions/bookAction.js'

function Home() {
    const dispatch = useDispatch();
    const { loading, error, books } = useSelector((state) => state.books);
    useEffect(()=>{
         if (error) {
      alert.error(error);
    }
      if(!error)
      {
    dispatch(getAllBooks());
      }
    },[dispatch,error])
  return (
    <Fragment>
        {
        loading?(
            <Box sx={{ width: '100vw',height: '100vh', display:'flex', justifyContent:'center', alignItems:'center'
                 }}>
              <CircularProgress color="inherit" style={{width:'5vmax', height:'5vmax'}} />
            </Box>):(<Fragment >
                <div className='page-heading'>
            <h1 className="homeHeading">Featured Books</h1>
          <div className="container1" id="container">
            {books && books.map((book)=>{
                return(<BookCard key={book._id} book={book}></BookCard>)
            })}
          </div>
         </div>
            </Fragment>)
        }
        
    </Fragment>
  )
}

export default Home