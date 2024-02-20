import React, { useEffect, useRef, useState } from 'react'
import '../Stlyles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import profileImage from '../assets/icons8-user-100.png'
import vStationImage from '../assets/icons8-ratings-100.png'
import overView from '../assets/icons8-overview-100.png'
import resultImage from '../assets/icons8-results-100.png'
import logoutImage from '../assets/icons8-logout-100.png'
import logoImage from '../assets/icons8-elections-100.png'
import admineImage from '../assets/icons8-admin-100.png'
import axios from 'axios'

function Login({data, getEmail}) {

  const [admin,setAdmin] = useState([]);
  const [isLogedin,setisLogedin] = useState(false);
 

  useEffect(() => {
    const checkAuthentication = () => {
      
      const isLogedin = localStorage.getItem('email')
        setisLogedin(isLogedin);
    }

    checkAuthentication();
  }, []);

  useEffect(() => {
      const result = async () =>{
        try {
          const adminData = await axios.get('http://localhost:8080/voters/admin');
          setAdmin(adminData.data);
        } catch (error) {
          console.error(error);
        }
       
      };
       result()}, []);

  let navigate = useNavigate();
  const [errorEmail,setErrorEmail] = useState(false);
  const [errorPassword,setErrorPassword] = useState(false);
  const loginText = 'Just one more thing before you access the voting site. Enter your credential please. Thank you'
  
  const [voter,setVoter] = useState({
    email:"",
    password:""
});

  const {email,password} = voter;



  const onInpuChange = (e)=>{
    setVoter({...voter,[e.target.name]:e.target.value});
  }

  //validate and login
  const onSubmit = (e)=>{
        e.preventDefault();

        let matchEmail = data.find((voterEmail)=> voterEmail.email === email);
        let matchPassword = data.find((voterPassword)=> voterPassword.password === password);


        try {
          if(!email.trim()){ alert('Email field is required');setErrorEmail(true);}
          else if(!password.trim()){ alert('Password field is required'); setErrorPassword(true)}
          else if(!matchEmail || !matchPassword){ alert('Incorrect credintials'); setErrorPassword(true);setErrorEmail(true)}
          else if(email.trim() === admin.email && password.trim() === admin.password){
            alert('admin success');getEmail(email);navigate('/')
          }else if(matchEmail.email === email.trim() && matchPassword.password === password.trim()){
            navigate('/comments');alert('success');getEmail(email);}
        } catch (error) {}
    
  }

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
    <div className='formContainer'>

          <div className='nav-bar'>
                <div className='logo'>
                    <img src={logoImage}/>
                    <p>EaziVote</p>
                </div>

                    <Link className='profile' to={'/profile'} >
                        <img src={profileImage}/>
                         <h6>Profile</h6> 
                    </Link>

                    <Link className='home' to={'/comments'}>
                        <img src={overView}/>
                          <h6>Comments</h6>  
                    </Link>

                    <Link className='logout' to={'/voting'}>
                        <img src={vStationImage}/>
                          <h6>Station</h6>  
                    </Link>

                    <Link className='logout' to={'/results'}>
                        <img src={resultImage}/>
                          <h6>Results</h6> 
                    </Link>   

                    {isLogedin ? (<Link className='logout' onClick={logout}>
                                    <img src={logoutImage}/>
                                    <h6>Logout</h6>
                                </Link>) : ('')}
                          

            </div>

        <div className='wrapper-login'>

        <div className='form-div'>

            <div className='heading-div'>
              <p>{loginText}</p> 
              <h1>Login</h1>
              <hr/>
            </div>

          <form className='loginForm' onSubmit={(e)=>onSubmit(e)}>
                <input type="email" className={` ${errorEmail ? 'form-errorEmail' :'form-control' }`}
                placeholder='Email addess' onChange={(e)=>onInpuChange(e)} onFocus={()=>setErrorEmail(false)} value={email} name='email'
                />
                <input type="password" className={`${errorPassword ? 'form-errorPassword' : 'form-control'}`}
                placeholder='Password'onChange={(e)=>onInpuChange(e)} onFocus={()=>setErrorPassword(false)} value={password} name='password'
                />

                <div className='buttonLogin'>
                <Link className='forgot-pass'  to={'/forgotpassword'} >Forgot password</Link>
                <button className='login-2' type="submit" >Submit</button>
                <Link className='back-login' to={'/'} >Back</Link>
                </div>
          </form>
          
        </div> 

        <div className='login-hero'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>
        </div>

        </div>


    </div>
  )
}

export default Login
