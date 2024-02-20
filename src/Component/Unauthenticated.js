import React from 'react'
import '../Stlyles/Unauthenticated.css'
import warning from '../assets/icons8-warning-100.png'
import { Link, useNavigate } from 'react-router-dom'

function Unauthenticated() {


  return (
    <div className='redirect'>
        <div className='card-redirect'>
        <img src={warning}/>
        <h5>you're not loggedIn</h5>
        <Link className='goto-login' to={'/login'}>OK</Link>
        </div>
        
      
    </div>
  )
}

export default Unauthenticated
