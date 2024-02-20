import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Stlyles/Admin.css'

function Admin() {
        const navigate = useNavigate()
    const logout = () => {
        try {
    
          localStorage.clear();
          navigate('/login');
          window.location.reload();
          window.close();
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };

  return (
    <div className='admin-wrapper'>
       
            <Link className='back-arrow' to={'/login'}>&#8592;</Link>
   
        <div className='admin-nav'>
            <Link className='candidate-btn' to={'/'}>&#8962; Home</Link>
            <Link className='voter-btn' to={'/viewvoters'}>View Voters</Link>
            <Link className='candidate-btn' to={'/viewcandidates'}>View Candidates</Link>
            <Link className='candidate-btn' to={'/candidate'}>Add Candidates</Link>
            <Link className='voter-btn' onClick={() =>logout()}>&#10096; Logout</Link>
            
        </div>
        <div className='admin-cont'>
            <h1>Administration content</h1>
        </div>
      
    </div>
  )
}

export default Admin
