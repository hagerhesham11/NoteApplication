import axios from 'axios';
import { useFormik } from 'formik';
import React ,{ useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SingleNote from '../SingleNote/SingleNote';

export default function Notes() {
  const [show, setShow] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [notes, setNotes] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  let headers = {
    token : localStorage.getItem('token')
  }
async function addNote(values){
  setisLoading(true)
   let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,values,{headers:headers}).catch((err)=>{
      console.log(err)
      setisLoading(false)
   })
   console.log(data)
   if(data.msg === 'done'){
    values.title = "";
    values.content = "" ;
    setisLoading(false);
    getAllNotes()
    handleClose();
   
   }
}

  let formik = useFormik({
    initialValues:{
      title:'',
      content:''
    },
    onSubmit:addNote
  })

  async function getAllNotes(){
    let { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{headers:headers}).catch((err)=>{
      console.log(err)
    })
    console.log(data)
    if(data?.msg === 'done'){
    setNotes(data.notes)
      
    }
  }

useEffect(()=>{
  getAllNotes()
},[])

  return (
    <div className='container mt-5'>
       <Button variant="primary" className='mb-4' onClick={handleShow}>
        Add Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
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
           {isLoading? <i className='fa-solid fa-spinner fa-spin-pulse'></i> : "Add Note"}
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
      <div className="row g-3">
       {notes? notes.map((note) => {
        return  <SingleNote  note={note} getNotes={getAllNotes}/>
       }) : ""
      
      }
      </div>
    </div>
  )
}

