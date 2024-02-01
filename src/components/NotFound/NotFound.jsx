import React from 'react'
import error from '../../images/Oops2.jpg'
export default function NotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <img src={error} alt="error404" />
    </div>
  )
}

