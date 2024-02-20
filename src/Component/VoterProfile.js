import React, { useEffect, useState } from 'react'
import '../Stlyles/VoterProfile.css'
import profileImage from '../assets/icons8-user-100.png'
import homeImage from '../assets/icons8-home.svg'
import vStationImage from '../assets/icons8-ratings-100.png'
import logoutImage from '../assets/icons8-logout-100.png'
import overView from '../assets/icons8-overview-100.png'
import logoImage from '../assets/icons8-elections-100.png'
import resultImage from '../assets/icons8-results-100.png'
import pp from '../assets/homee-removebg-preview.png'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Unauthenticated from './Unauthenticated';

function VoterProfile({email}) {
    const navigate = useNavigate();
    const [edit,setEdit] = useState(false);
    const [dataObj,setDataObj] = useState({});
    const id = dataObj ? dataObj.id : null
    const [isLogedin, setisLogedin] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
          
          const valid_email= JSON.parse(localStorage.getItem('email'));
          setisLogedin(valid_email);
          
        
        };
    
        checkAuthentication();
      }, []);
    

    useEffect(() => {
        const loadUser = async () => {
          try {
            if (isLogedin) {
              const results = await axios.get(`http://localhost:8080/voters/getByEmail/${isLogedin}`);
              setDataObj(results.data || {});
            } else {
              console.error('Email not available');
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        loadUser();
      }, [isLogedin]);  


    const onChange = (e) => {
        const { name, value } = e.target;
        setDataObj((prevDataObj) => ({
          ...prevDataObj,
          [name]: value,
        }));
      };

      const onSubmit =async (e)=>{
        e.preventDefault();

        try {
           
            await axios.put(`http://localhost:8080/voters/update/${id}`,dataObj);
            window.location.reload();
            localStorage.setItem('email',JSON.stringify(dataObj.email));
            setEdit(false)
                
           
        } catch (error) {
            alert( error);
            console.log(error)
        }
      
       
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
    <div className='profile-container'>

      {isLogedin ? (<>
        <div className='nav-bar'>
            
            <div className='logo'>
                <img src={logoImage}/>
                <p>EaziVote</p>
            </div>


                <Link className='home' to={'/'}>
                    <img src={homeImage}/>
                    <h6>Home</h6>
                </Link>

                <Link className='overview' to={'/comments'}>
                    <img src={overView}/>
                    <h6>Comments</h6>
                </Link>

                <Link className='v-station' to={'/voting'}>
                    <img src={vStationImage}/>
                    <h6>Station</h6>
                </Link>

                <Link className='profile' to={'/results'}>
                    <img src={resultImage}/>
                    <h6>Results</h6>
                </Link>


                <Link className='logout' onClick={logout}>
                    <img src={logoutImage}/>
                    <h6>Logout</h6>
                </Link>

    
            </div>

<div className='voter-details'>
<h2 className='profile-title'>Profile</h2>

<div className='p-image'>

          <img src={pp}/>     
    {edit ? (<div className='profile-action'>

                <button className='upload'>Upload &#8595;</button>
                <div className='edit-container'>
                    <button className='save-profile' onClick={onSubmit}>Save</button>
                    <button className='cancel-edit' onClick={() =>setEdit(false)}>Cancel</button>
                </div>

              </div>) : ('')}

</div>

{edit ? (<div className='f-wrapper'>

            <form className='profileForm' >

                <input type="text" className="formControl-signup" placeholder='Name'value={dataObj.name}   name='name' onChange={(e)=>onChange(e)}/>
                <input type="text" pattern="[0-9]*" minLength={10} maxLength={13} className="formControl-signup" placeholder='Phone'onChange={(e)=>onChange(e)} value={dataObj.phone} name='phone'/>
                <input type="email" className="formControl-signup" placeholder='Email addess' value={dataObj.email} name='email'onChange={(e)=>onChange(e)}/>
                
     
            </form>
        
        </div> ) :
         (<div className='user-details' >
      
            <h6>{dataObj.name}</h6>
            <h6>{dataObj.email}</h6>
            <h6>{dataObj.phone}</h6>
            <button className='edit-btn' onClick={()=>setEdit(true)} >Edit</button>
            
        </div>)}


</div>
      </>) : (<Unauthenticated/>)}


    </div>
  )
}

export default VoterProfile





