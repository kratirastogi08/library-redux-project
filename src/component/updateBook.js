import React,{ Fragment, useEffect,useState,useRef } from 'react'
import { Formik ,Field,Form,ErrorMessage} from "formik";
import * as Yup from "yup";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import axios from 'axios';
import Select from 'react-select'
import './updateBook.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getAllBooks as getBooks, updateBook as update} from '../actions/bookAction.js'

 function UpdateBook() {
  const dispatch = useDispatch();
   const { loading, error, books} = useSelector((state) => state.books);
    const { error:updateBookError, success,message} = useSelector((state) => state.updateBook);
    const navigate = useNavigate();
    let b=[]
    let c={};
    const selectInputRef = useRef();
    const [bookObj, setBookObj] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [booksArray, setBooksArray] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [bookss,setBookss]=useState([])
    const initialValues = {
        color:"",
        title: bookObj.bookTitle,
        author: bookObj.author,
        price:bookObj.price,
        id:bookObj._id
      };
      const initialValues1 = {
        color:"",
        title: "",
        author: "",
        price:"",
        id:""
      };
    const updateBookSchema = Yup.object().shape({
        title: Yup.string().required("title is required"),
      
        author: Yup.string()
          .required("author is required"),

        price: Yup.number()
          .required("price is required") 
      });

     const updateBook=async (values)=>{
         const {id}=values
        const body={...values,bookTitle:values.title}
        delete body.title
        delete body.color
        delete body.id
        dispatch(update(id,body))
        
        if(updateBookError)
      {
        alert.error(updateBookError)
      }

     }

    useEffect(()=>{
       console.log("rr")
         dispatch(getBooks())
      
     if(books && books.length )
        {  setBooksArray(books)
             b=books.map(a=>{
                 const {_id,bookTitle,author,price,__v,...obj}=a;
                 obj.value=bookTitle
                obj.label=bookTitle
                return obj
             })
             setBookss(b)
             console.log("q",bookss)
             }
       
      

      if(selectedOption )
        {  dispatch(getBooks())
        console.log("h")
          console.log("io",booksArray)
         c=books.find(book=>book.bookTitle===selectedOption.value)
         setBookObj(c)
         setShowForm(true)  
        }
         if(success){
  setTimeout(()=>{
        dispatch({type:"CLEAR_MESSAGE"})
        },2000)
     }
     
    },[selectedOption,dispatch,error,success])
    return (
        <Fragment>
            {loading?(<Box sx={{ width: '100vw',height: '100vh', display:'flex', justifyContent:'center', alignItems:'center'
                 }}>
              <CircularProgress color="inherit" style={{width:'5vmax', height:'5vmax'}} />
            </Box>):(
            
              <Fragment>
                  <div className='page-heading'>
             <h2>Update Book</h2>
              <label  style={{ display: "block" ,marginTop:"50px",textAlign:"center"}}>Color </label>
               <Select
               ref={selectInputRef}
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={bookss}
              className="select"
                />
                { 
                    showForm?(
                  <Formik
        initialValues={initialValues}
        validationSchema={updateBookSchema}
         enableReinitialize={true}
          onSubmit={(values,{ setSubmitting,...actions}) => {  
            console.log("y1",values)
            updateBook(values)
            
             setBookObj({})
             selectInputRef.current.clearValue();
             actions.resetForm({ values: initialValues1 })
            
          }}
        >
            { 
                (formik)=>{
                    let { errors, touched, isValid, dirty,isSubmitting} = formik;
                    return(
                        <div className="container2">
                      <Form className="addBookForm">
                     <div className="form-row">
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  name="title"
                  id="title"
        
                  className={`form-control ${errors.title && touched.title ? 
                  "input-error" : null}`}
                />
                <ErrorMessage name="title" component="span" className="error" />
                </div>

                <div className="form-row">
                <label htmlFor="author">Author</label>
                <Field
                  type="text"
                  name="author"
                  id="author"
            
                  className={`form-control ${errors.author && touched.author ? 
                  "input-error" : null}`}
                />
                <ErrorMessage
                  name="author"
                  component="span"
                  className="error"
                />
              </div>
              <div className="form-row">
                <label htmlFor="price">Price</label>
                <Field
                  type="number"
                  name="price"
                  id="price"
                  className={`form-control ${errors.price && touched.price ? 
                  "input-error" : null}`}
                />
                <ErrorMessage
                  name="price"
                  component="span"
                  className="error"
                />
              </div>
              <button
                type="submit"
                className={`add-btn ${(!(dirty && isValid)|| isSubmitting)? "disabled-btn" : ""}`}
                disabled={(!(dirty && isValid))|| isSubmitting}
              >
                Update Book
              </button> 
              <button className='add-btn' onClick={()=>navigate('/')}>Go Back</button>
              {message && message.length>0?(<p className="success-msg">{message}</p>):""}         
                      </Form>
                  </div>
                    )
                }
                
            }
        </Formik>)
                    :null
                }
                </div>
          </Fragment>
        
       
        
      )
            }
      </Fragment>)
}

export default UpdateBook