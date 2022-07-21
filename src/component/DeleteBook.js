import React, { useEffect,Fragment,useState } from 'react'
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import axios from 'axios'
import './deleteBook.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import {getAllBooks,deleteBook as deleteBookById} from '../actions/bookAction.js'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";




function DeleteBook() {
  const dispatch = useDispatch();
    const { loading, error, books } = useSelector((state) => state.books);
     const { success,error:deleteError } = useSelector((state) => state.deleteBook);
    const columns = [
        { field: 'id', headerName: 'Id', width: 150 , flex: 1},
        { field: 'title', headerName: 'Title', width: 150,flex: 1 },
        { field: 'author', headerName: 'Author', width: 150 ,flex: 1},
        { field: 'price', headerName: 'Price', width: 150 ,flex: 0.5},
        {
            field: "actions",
            flex: 0.5,
            headerName: "Actions",
            width: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
              return (
                <Button onClick={()=>openDialog(params.getValue(params.id, "id"))
                   }>
                  <DeleteIcon />
                </Button>
              );
            },
          },
      ];
    const [tableData, setTableData] = useState([])
    const [open, setOpen] = useState(false);
    const [Id, setId] = useState(null);
    let rows = [];
    const openDialog = (id="") => {
      if(id && id.length>0)
      {
          setId(id)
      }
        open ? setOpen(false) : setOpen(true);
      };
     const deleteBook=async (id)=>{
          dispatch(deleteBookById(id))
          if(success)
          {
          const modifiedData=tableData.filter((o)=>o.id!==id)
          setTableData(modifiedData)
          setOpen(false)
          }
          
     }
    useEffect(()=>{
      if(!books)
      {
        dispatch(getAllBooks())
      }
       
      if(books && books.length>0)
        {
            books.forEach((book)=>{
                rows.push({
                    id:book._id,
                    title:book.bookTitle,
                    author:book.author,
                    price:book.price
                })   
               })
               setTableData(rows)        
        }
      },[books])
  return (
   <Fragment>
       {loading?(
       <Box sx={{ width: '100vw',height: '100vh', display:'flex', justifyContent:'center', alignItems:'center'
    }}>
 <CircularProgress color="inherit" style={{width:'5vmax', height:'5vmax'}} />
</Box>
      ):(<div className="page-heading">
          <h2>Delete Book</h2>
      <DataGrid rows={tableData} columns={columns} className="myTable"
            autoHeight />
            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={openDialog}
          >
              <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent className="submitDialog">
            Are you sure you want to delete?
            </DialogContent>
            <DialogActions>
              <Button onClick={openDialog} color="secondary">
                Cancel
              </Button>
              <Button onClick={()=>deleteBook(Id)} color="primary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
    </div>)}
   </Fragment>
  )
}

export default DeleteBook