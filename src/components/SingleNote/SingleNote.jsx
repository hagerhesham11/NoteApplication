import React, { useState } from 'react';
import styles from './SingleNote.module.scss';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, useFormik } from 'formik';


export default function SingleNote({note , getNotes}) {

const [show, setShow] = useState(false);
const [isLoading, setisLoading] = useState(false)
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

let headers = {token:localStorage.getItem('token')}
  
async function deleteNote(){
  setisLoading(true)
  let res = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,{headers:headers}).catch((err)=>{
    setisLoading(false)
    console.log(err.data.msg)
  })
 console.log(res.data)
   if(res?.data?.msg === 'done'){
    getNotes()
    setisLoading(false)
  }
} 

async function updateNote(values){
 
  let res = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,values,{headers:headers}).catch((err)=>{
   
    console.log(err.res.data.msg)
  })
  console.log(res)
  if(res?.data?.msg === 'done'){
  
    handleClose()
    getNotes()
   
  }
}

let formik = useFormik({
  initialValues:{
    title:note.title,
    content:note.content
  },
  onSubmit:updateNote
})


  return (
    
   <>
   <Modal show={show} onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <input type="text" 
          className='form-control'
          id="title"
           placeholder="title"
          value={formik.values.title}
          onChange={formik.handleChange}/>
          </div>

          <div className='mt-3'>
            <textarea name="content"
            className='form-control'
             id="content" 
            placeholder='content' 
            rows={3} 
            value={formik.values.content}
            onChange={formik.handleChange}></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
           {isLoading? (<i className='fa-solid fa-spinner fa-spin-pulse'></i>) : ("Update Note")}
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

      <div className="col-md-3">
        <div className={`d-flex justify-content-center align-items-center rounded-4 ${styles.noteBody} shadow p-4 mb-4 `}>
          <div className="text-center overflow-hidden">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <div className="d-flex justify-content-center">
              
            <i onClick={handleShow} className='fa-solid fa-pen-to-square text-primary cursor-pointer me-5' ></i>
              
             {isLoading ? (<i className="fa-solid fa-spinner fa-spin-pulse"></i>) : (<i onClick={()=>{deleteNote()}} className='fa-solid fa-trash text-danger cursor-pointer'></i>  )}
            
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

