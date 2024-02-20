import React, { useEffect, useState } from 'react'
import '../Stlyles/Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Signup({data}) {

    const navigate = useNavigate()
    const [voter,setVoter] = useState({
        id:'',
        name:'',
        phone:'',
        email:'',
        password:''

    });

    const {id,name,phone,email,password} = voter;

  
    const [confirmPaasword,setConfirmPaasword] = useState('')

    const onChange = (e)=>{
        setVoter({...voter,[e.target.name]:e.target.value})
    }

    const onChangePassword = (e)=>{
        setConfirmPaasword(e.target.value)
    }



    const onSubmit =async (e)=>{
        e.preventDefault();

        try {
            let verId = data.find((voterId)=> voterId.id === parseInt(id));

            let verEmail = data.find((voterId)=> voterId.email.toLowerCase() === email.toLowerCase());
          
            
            if(id === ''){
                alert('Enter identity number')
            }else if(verId){
                alert('Identity number already exist')
            }else if(name === ''){
                alert('Enter name')
            }else if(email === ''){
                alert('Enter email')
            }else if(verEmail){
                alert('Email address already exist')
            }else if(password === ''){
                alert('Enter password')
            }else if(confirmPaasword === ''){
                alert('Confirm password')
            }else if(password !==  confirmPaasword){
                alert('Password and Confirm Password does not match')
            }else{  
    
                await axios.post("http://localhost:8080/voters/signup",voter);
                window.location.reload();
                alert('Signup successfully'); 
                navigate('/login')
                
            }
        } catch (error) {
            alert( error);
            console.log(error)
        }
      
    }



  return (
    <div className='formContainer-signup'>

        <div className='wrapper-div'>
                <div className='hero-signup'></div>
                <div className='form-div-sign'>
                    <h1>Signup</h1>
                    <form className='signupForm' onSubmit={(e)=>onSubmit(e)}>

                        <input autoComplete='off' type="text" inputMode='numeric' maxLength={5} className="formControl-signup" placeholder='Identity number' onChange={(e)=>onChange(e) } value={id} name='id'/>
                        <input type="text" className="formControl-signup" placeholder='Name' onChange={(e)=>onChange(e)} value={name} name='name'/>
                        <input type="text" pattern="[0-9]*" minLength={10} maxLength={13} className="formControl-signup" placeholder='Phone'onChange={(e)=>onChange(e)} value={phone} name='phone'/>
                        <input type="email" className="formControl-signup" placeholder='Email addess'onChange={(e)=>onChange(e)} value={email} name='email'/>
                        <input type="password" minLength={5} className="formControl-signup" placeholder='Password'onChange={(e)=>onChange(e)} value={password} name='password'/>
                        <input type="password" className="formControl-signup" placeholder='Confirm password' onChange={(e)=>onChangePassword(e)} value={confirmPaasword} name='confirmPasword'/>

                        <div className='buttonSignup'>
                        
                        <button className='sign' type="submit" >Submit</button>
                        <Link className='back-signup' type="submit" to={'/'} >Back</Link>
                        </div>

                    </form>
                </div>

        </div>


  </div>
  );

}
export default Signup
