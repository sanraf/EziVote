import React, { useEffect, useState } from 'react'
import '../Stlyles/Results.css'
import { Link, useNavigate } from 'react-router-dom'
import homeImage from '../assets/icons8-home.svg'
import vStationImage from '../assets/icons8-ratings-100.png'
import logoutImage from '../assets/icons8-logout-100.png'
import logoImage from '../assets/icons8-elections-100.png'
import overView from '../assets/icons8-overview-100.png'
import axios from 'axios'
import Unauthenticated from './Unauthenticated';

function Results({data,email}) {

    const navigate = useNavigate()
    const [candidateData,setCandidateData] = useState([])
    const [name,setName] = useState('');
    const [votedUser,setvotedUser] =useState('');
    const [isLogedin, setisLogedin] = useState(false);
    const [totalVotes, settotalVotes] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 3;


    useEffect(() => {
        const checkAuthentication = async () => {
          
          const isLogedin = localStorage.getItem('email');
          setisLogedin(isLogedin);
        
        };
    
        checkAuthentication();
      }, []);


      useEffect(()=>{
        const result = async ()=>{

            try {
              const response = await axios.get(`http://localhost:8080/candidate/pagination/${currentPage}/${pageSize}`);
                setCandidateData(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        
        };
        result();
          
        const user = data.find(userObj => userObj.email === email);
        if (user) {
          setName(user.name);
        }
    },[currentPage,pageSize]);
 

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/candidate/totalVotes');
            settotalVotes(response.data);
          } catch (error) {
            console.error(error);
          } 
        };
      
        fetchData(); 
      
        const user = data.find(userObj => userObj.email === email);
        if (user) {
          setName(user.name);
        }
      }, []); 
      
      useEffect(()=>{
        const result = async ()=>{

            try {
                const respond = await axios.get('http://localhost:8080/candidate/getVotersFromCandidate');

                const totalEmails = respond.data.reduce((count, innerArray) => count + innerArray.length, 0);
                setvotedUser(totalEmails);
            } catch (error) {
                console.error(error);
            }
        
        };
        result();
    },[]);

    
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
    <div className='resultcontainer'>
        {isLogedin ? (<>
            <div className='content-wrapper'>
            <div className='nav-bar'>
                <div className='logo'>
                    <img src={logoImage}/>
                    <p>EaziVote</p>
                </div>
             

                    <Link className='home' to={'/'}>
                        <img src={homeImage}/>
                        <h6>Home</h6>
                    </Link>

                    <Link className='home' to={'/comments'}>
                        <img src={overView}/>
                        <h6>Comments</h6>
                    </Link>

                    <Link className='v-station' to={'/voting'}>
                        <img src={vStationImage}/>
                        <h6>Station</h6>
                    </Link>

                    <Link className='logout' onClick={logout}>
                        <img src={logoutImage}/>
                        <h6>Logout</h6>
                    </Link>
         
            </div>

            <div className='result-wrapper'>

                <div className='total-wrapper'>
                    <div className='total-voters'>
                        <h5>{data.length}</h5>
                        <p>Registered Voters</p>
                    </div>
                    <div className='total-voters'>
                        <h5>{votedUser}</h5>
                        <p>Voted candidates</p>
                    </div>

                    <div className='total-voters'>
                        <h5>{(data.length - votedUser)}</h5>  
                        <p>Non-Voter </p>
                    </div>

                </div>

                <div className='user-navbar'>
                    <div className='user-info'>
                        <div className='user-image'> </div>
                        <div className='userdetails'>
                            <h4>{name}</h4>
                            <p>{email}</p>
                        </div>
                    </div>
                    <Link className='profile-button' to={'/profile'}>Profile</Link>
                </div>
                {console.log(totalVotes)}
                <div className='cards-wrapper'>
                    {candidateData.map((mapdata) =>(
                    <div className="card-results" key={mapdata.id}>
                        <img className='card-image' src={`data:image/jpeg;base64,${mapdata.photo}`}/>
                        <h4>{mapdata.party}</h4>
                        <div className="status-results">
                        <h3 >Results {(mapdata.voteCount*(1)).toFixed(1)}%</h3>
                        <p className="card-text">Status 'win or lose'</p>   
                        </div>
                    </div>))}

                </div>

                <div className='pagingButtonResult'>
                    <button className='leftResult' onClick={() =>setCurrentPage(currentPage - 1)} disabled={currentPage === 0}/>
                    <p>page: {currentPage + 1} of {totalPages}</p>
                    <button className='rightResult' onClick={() =>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}/>
                </div>
              
            </div>
        </div>
        </>) : (<Unauthenticated/>)}

    </div>
  )
}

export default Results
