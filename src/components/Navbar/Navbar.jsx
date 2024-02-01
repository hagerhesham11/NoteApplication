import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  let navigate = useNavigate()
  const [userToken, setUserToken] = useState(null)
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setUserToken(localStorage.getItem('token'))
    }
  },[])
  function logOut (){
    localStorage.removeItem('token')
    setUserToken(null)
    navigate('/login')
  }
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Note App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           {userToken !== null ? <>
            <li className="nav-item">
              <Link className="nav-link" to="/">Notes</Link>
            </li>
           </> : null }
           
          </ul>

          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>

            {userToken == null ? <>
              <li className="nav-item">
              <Link className="nav-link" to="/signup">Register</Link>
            </li>
            <li className="nav-item" >
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            </> 
            : <>
              <li className="nav-item" onClick={logOut}>
              <Link className="nav-link" to="">LogOut</Link>
            </li>
            </>}
         
           
          </ul>
         
        </div>
      </div>
    </nav>
     
    </div>
  )
}

