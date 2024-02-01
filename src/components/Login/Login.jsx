import { useFormik } from 'formik';
import React , { useState }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signin from '../../images/login-bg.png'
import * as Yup from 'yup';
import axios from 'axios';
import styles from './Login.module.scss';

export default function Login() {
  const navigate=useNavigate()
  const [errMessage,setErrMessage]=useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function sendData(values){
    setIsLoading(true)
   let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,values).catch((err)=>{
    setErrMessage(err.response.data.msg)
    setIsLoading(false)
   })
   //console.log(data)
   if(data?.msg ==='done'){
    setIsLoading(false)
    localStorage.setItem('token',`3b8ny__${data.token}`)


    navigate('/')
   }
  }
  let myValidation=Yup.object({
    email:Yup.string().required('Email is Required').email(),
    password:Yup.string().required('Password is required')
  })
 let formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:myValidation
    ,
    onSubmit: sendData 
  })
  

  return (
    <div className="sign-in d-flex justify-content-center align-items-center vh-100">
    <div className="container shadow p-5 mb-5 bg-body rounded-2">
    <div className="signin-content row ">
    <div className="signin-image col-md-6 pe-5">
       <figure>
       <img className='w-100' src={signin} alt="singIn" />
       </figure>
     </div>
       <div className='signin-form col-md-6'>
         <h2 className='form-title fw-bold '>Login Form</h2>
            
         {errMessage.length > 0 ? (<div className="alert alert-danger" role='alert'>{errMessage}</div>):("")}

                <form onSubmit={formik.handleSubmit}>
                
                <div className="form-group d-flex align-items-center mb-4">
                 <label htmlFor="email"><i className='fa-solid fa-envelope'></i></label>
                 <input type="email"  id='email' placeholder='Your Email' name='email'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/> 
                </div>
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}
      
                <div className="form-group d-flex align-items-center mb-4">
                <label htmlFor="password"><i className='fa-solid fa-lock'></i></label>
                <input type="password" id='password'placeholder='Your Password' name='password'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                </div>
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}
      
                 
               <button type='submit' className='btn btn-danger'>{isLoading? <i className='fa-solid fa-spinner fa-spin-pulse'></i>:"Sign in"}</button>
           </form>
           <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <span className='me-4 mb-2 fs-5'> Or Sign in with:</span>
              <ul className='d-flex justify-content-evenly list-unstyled'>
                <li><i className={`fa-brands fa-facebook ${styles.facebookIcon}`}></i></li>
                <li><i className={`fa-brands fa-twitter ${styles.twitterIcon}`}></i></li>
                <li><i className={`fa-brands fa-google-plus-g ${styles.googleIcon}`}></i></li>
              </ul>
              <p className='mt-2 me-3'>Don't Have an account? <Link to='/signup' className='text-primary mx-2'>Sign up</Link> </p>

           </div>
      
   </div>
  

   </div>
</div>
  </div>
  )
}

