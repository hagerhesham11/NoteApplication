import { useFormik } from 'formik';
import React, { useState } from 'react';
import './Register.module.scss'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import signup from '../../images/userlog.png'
import axios from 'axios';

export default function Register() {
    let navigate = useNavigate()
  const [errMessage,setErrMessage]=useState('')
  const [isLoading, setIsLoading] = useState(false)
 
 
  async function sendData(values){
    setIsLoading(true)
   let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp` ,values).catch((err)=>{
     setErrMessage(err.response.data.msg)
     console.log(err.response.data.msg)
     setIsLoading(false)
   })
   console.log(data)
   if(data.msg === 'done'){
    setIsLoading(false)
     navigate('/login')
   }
   
 }

 let myValidation =Yup.object({
  name:Yup.string().required('Name is Required').min(3,'min Length is 3').max(30,'max Length is 30'),
  email:Yup.string().required('Email is Required').email('Invalid Email Address'),
  password:Yup.string().required('Password is Required').matches("^[A-Z][a-zA-Z0-9!@$#*^%*()_-]{3,16}$",'Password must start with uppercase'),
  age:Yup.number().required('Age is Required').positive().integer().min(14),
  phone:Yup.string().required('Phone is Required').matches("^01[1052][0-9]{8}$",'Invalid phone number')
 })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      age:0,
      phone:''
    },
    validationSchema:myValidation
    ,
    onSubmit: sendData
    
  })
  return (
   <div className="d-flex justify-content-center align-items-center vh-100 ">
     <div className="container shadow p-5 mb-4 bg-body rounded-2">
     <div className="row">
        <div className='col-md-6 overflow-auto'>
          <h2 className='form-title fw-bold'>Sign up:</h2>
          {errMessage.length > 0 ? (<div className="alert alert-danger" role='alert'>{errMessage}</div>):("")}

           <form onSubmit={formik.handleSubmit}>
            
            <div className="form-group d-flex align-items-center mb-4 ">
             <label htmlFor="name"><i className='fa-solid fa-user'></i></label>
             <input type="text"  id='name' name='name' placeholder='Your Name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
            </div>
            {formik.errors.name && formik.touched.name ? (<div className='alert alert-danger' role='alert'>{formik.errors.name}</div> ): ("")}

           <div className="form-group d-flex align-content-center mb-4">
            <label htmlFor="email"><i className='fa-solid fa-envelope'></i></label>
            <input type="email"  id='email' placeholder='Your Email' name='email'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/> 
           </div>
           {formik.errors.email && formik.touched.email ? (<div className='alert alert-danger' role='alert'>{formik.errors.email}</div>) : ("")}

           <div className="form-group d-flex align-items-center mb-4">
           <label htmlFor="password"><i className='fa-solid fa-lock'></i></label>
           <input type="password" id='password'placeholder='Your Password' name='password'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
           </div>
           {formik.errors.password && formik.touched.password ? (<div className='alert alert-danger' role='alert'>{formik.errors.password}</div>) : ("")}

           <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="age"><i className='fa-regular fa-calendar-days'></i></label>
            <input type="number" placeholder='Your age' id='age' name='age'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age}/>
           </div>
           {formik.errors.age && formik.touched.age ? (<div className='alert alert-danger' role='alert'>{formik.errors.age}</div>) : ("")}

            <div className="form-group d-flex align-items-center mb-4">
            <label htmlFor="phone"><i className='fa-solid fa-phone'></i></label>
            <input type="tel"  id='phone' placeholder='Your Phone Number' name='phone'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
            </div>
            {formik.errors.phone && formik.touched.phone ? (<div className='alert alert-danger' role='alert'>{formik.errors.phone}</div>) : ("")}

          <button type='submit' className='btn btn-primary'>{isLoading? <i className='fa-solid fa-spinner fa-spin-pulse'></i> :"Register"}</button>
           <p className='mt-4 me-3'>Have an account? <Link to='/login' className='text-primary mx-2'>Sign In</Link> </p>
      </form>
    </div>
    <div className="signup-image col-md-6 d-flex justify-content-center align-items-center px-5">
        <figure>
        <img className='w-100' src={signup} alt="singUp" />
        </figure>
      </div>

    </div>
 </div>
   </div>
  )
}

