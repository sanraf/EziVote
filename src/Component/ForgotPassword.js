import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Stlyles/ForgotPassword.css';

function ForgotPassword({data}) {

  const [dispPass,setDispPass] = useState(false);
  const [recoverPassword,setRecoverPassword] = useState('')
  const [user,setUser] = useState({
    id:"",
    email:""

});
const {id,email} = user;

  const onChange = (e)=>{ setUser({...user,[e.target.name]:e.target.value})}

  const onSubmit = (e) => {
    e.preventDefault();
  
    const matchEmail = data.find((item) => item.email.toLowerCase() === email.toLowerCase());
    const matchId = data.find((item) => item.id === parseInt(id));
    
    try {
      if (id === "") {
        alert('Identity number is required');
      } else if (email === "") {
        alert('Email address is required');
      } else if (!matchEmail || !matchId || (typeof matchId === 'undefined') || (typeof matchEmail === 'undefined')) {
        alert('Incorrecect details');
      } else {
        setRecoverPassword(matchEmail.password);
        setDispPass(true);
        
      }
    } catch (error) {
      alert('Internal Server Error');
    }
  };
  
  






  return (
    <div className='formContainer-password'>
       <h1>Password Recovery</h1>
    <div className='wrapper-pass'>
         
            <div className='form-div-pass'>
               
                <form className='passwordForm' onSubmit={(e)=>onSubmit(e)}>

                    <input autoComplete='off' type="text" inputMode='numeric' maxLength={5} className="formControl-pass"
                     placeholder='Identity number' onChange={(e)=>onChange(e) } value={id} name='id'
                     />
                    <input type="email" className="formControl-pass" 
                    placeholder='Email addess'onChange={(e)=>onChange(e)} value={email} name='email'
                    />
                    

                    <div className='buttonpass'>
                    
                    <button className='pass' type="submit" >Submit</button>
                    <Link className='back-pass' type="submit" to={'/login'} >Back</Link>
                    </div>

                </form>
            </div>

            {dispPass ? <div className='passwordHolder'><h5>YOUR PASSWORD IS</h5>{recoverPassword}</div>:''}

    </div>
     


    
</div>
  )
}

export default ForgotPassword
