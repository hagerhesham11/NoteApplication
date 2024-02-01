import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes(props) {
  console.log(props)
  if(localStorage.getItem('token')){
    return  <>{props.children}</> ; 
  }else{
    return <Navigate to='/login'/>
  }
 
}
