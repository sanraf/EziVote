import React, { useEffect, useState } from 'react'
import '../Stlyles/Home.css'
import { Link, useNavigate } from 'react-router-dom'
import profileImage from '../assets/icons8-user-100.png'
import vStationImage from '../assets/icons8-ratings-100.png'
import overView from '../assets/icons8-overview-100.png'
import admineImage from '../assets/icons8-admin-100.png'
import logoutImage from '../assets/icons8-logout-100.png'
import logoImage from '../assets/icons8-elections-100.png'
import resultImage from '../assets/icons8-results-100.png'
import axios from 'axios'

function Home({email}) {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  
  const navigate = useNavigate();
  const [isLogedin,setisLogedin] = useState(false);
  const [admin,setAdmin] = useState([]);

  useEffect(() => {
    const checkAuthentication = () => {
      
      const valid_email = JSON.parse(localStorage.getItem('email'));
      setisLogedin(valid_email);
   
    };

    checkAuthentication();
  }, [email]);


  useEffect(() => {
    const result = async () =>{
      try {
        const adminData = await axios.get('http://localhost:8080/voters/admin');
        setAdmin(adminData.data);
      } catch (error) {
        console.error(error);
      }
     
    };
     result()}, [email]);
  
  const logout = () => {
    try {

      localStorage.clear();
      navigate('/');
      window.location.reload();
      window.close();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='homeContainer'>

      <div className='nav-bar'>
                <div className='logo'>
                    <img src={logoImage}/>
                    <p>EaziVote</p>
                </div>
             
             {admin.email === isLogedin ? (
                      <Link className='profile-h' to={'/admin'} >
                              <img src={admineImage}/>
                               <h6>Admin</h6> 
                      </Link> ) : ('')}

                <Link className='profile-h' to={'/profile'} >
                        <img src={profileImage}/>
                          <h6>Profile</h6>  
                    </Link>


                    <Link className='home-h' to={'/comments'}>
                        <img src={overView}/>
                          <h6>Comments</h6>  
                    </Link>

                    <Link className='v-station-h' to={'/results'}>
                        <img src={resultImage}/>
                          <h6>Results</h6>  
                    </Link>
                    <Link className='v-station' to={'/voting'}>
                        <img src={vStationImage}/>
                          <h6>Station</h6>  
                    </Link>

                    {isLogedin ? (<Link className='logout' onClick={logout}>
                                    <img src={logoutImage}/>
                                    <h6>Logout</h6>  
                                </Link>) : ('')}
         
            </div>
      <div className='wrapper-home'>
          <div className='heroImage'></div>

            <div className='contentHolder'>
            {/* <div className = 'cloud'></div> */}
              <h1>Online Voting</h1>
              <h3>Home Page</h3>
              <p>{ text}</p>
              <div className='buttonHolder'>
                <Link className='login' to={'/login'}>Login</Link>
                <Link className='signup' to={'/signup'}>Signup</Link>
              </div>
            </div>
      </div>
      

      
    </div>
  )
}

export default Home
