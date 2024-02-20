import React, { useEffect, useState } from 'react'
import '../Stlyles/VotingPage.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import profileImage from '../assets/icons8-user-100.png'
import homeImage from '../assets/icons8-home.svg'
import overView from '../assets/icons8-overview-100.png'
import logoutImage from '../assets/icons8-logout-100.png'
import logoImage from '../assets/icons8-elections-100.png'
import resultImage from '../assets/icons8-results-100.png'
import Unauthenticated from './Unauthenticated';


function VotingPage() {

    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [isLogedin, setisLogedin] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isProcess,setisProcess] = useState(false);
    const [votedUser,setvotedUser] =useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 4;

    useEffect(() => {
        const checkAuthentication = async () => {
          
          const voter_email = JSON.parse(localStorage.getItem('email'));
          setisLogedin(voter_email);
        
        }
    
        checkAuthentication();
      }, []);
      
    useEffect(()=>{
        const result = async ()=>{

            try {
                const response = await axios.get(`http://localhost:8080/candidate/pagination/${currentPage}/${pageSize}`);
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        
        };
        result();
    },[currentPage,pageSize]);

    useEffect(()=>{
        const result = async ()=>{

            try {
                const response = await axios.get('http://localhost:8080/candidate/getVotersFromCandidate');
                setvotedUser(response.data);
            } catch (error) {
                console.error(error);
            }
        
        };
        result();
    },[]);

   


      const [progress, setProgress] = useState(0);
    
      const load = ()=> {
        // Check if the progress should continue
        if (progress < 100) {
          // Simulating progress over time
          const interval = setInterval(() => {
            // Update the progress value
            setProgress((prevProgress) => {
              const newProgress = prevProgress + 10;
              // Stop the progress when it reaches 100
              if (newProgress >= 100) {
                clearInterval(interval);
                return 100;
              }
              return newProgress;
            });
          }, 250); // Update every second
    
          // Clean up the interval when the component unmounts
          return () => clearInterval(interval);
        }
      }
    
      const handleButtonClick = () => {
        load()
        setProgress(0);
      };
    
  

const handleVote =async (candidate_id) => {
   
    try {

        const valid_email =   votedUser.some(email => email.includes(isLogedin));
        setSelectedUser(!candidate_id);
        if(valid_email){

            alert('you can only vote once');
            handleButtonClick();
            setSelectedUser(candidate_id); 
            setIsChecked(!isChecked);
        } else{

            await axios.put(`http://localhost:8080/candidate/assignVoteToCandidate/${isLogedin}/${candidate_id}`);
            alert('Voted successful');
            setIsChecked(!isChecked);
            setSelectedUser(candidate_id); 
            setisProcess(true);
           
            }
        } 
    catch (error) { console.log(error)}};
    

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
    
    
    <div className='voting-container'>

    {isLogedin ?(<><div className='nav-bar'>
                <div className='logo'>
                    <img src={logoImage}/>
                    <p>EaziVote</p>
                </div>

                    <Link className='home' to={'/'}>
                        <img src={homeImage}/>
                        <h6>Home</h6>
                    </Link>
             
                    <Link className='profile' to={'/profile'} >
                        <img src={profileImage}/>
                        <h6>Profile</h6>
                    </Link>

                    <Link className='overview' to={'/COMMENTS'}>
                        <img src={overView}/>
                        <h6>Comments</h6>
                    </Link>

                    <Link className='v-station' to={'/results'}>
                        <img src={resultImage}/>
                        <h6>Results</h6>
                    </Link>

                    <Link className='logout' onClick={logout}>
                        <img src={logoutImage}/>
                        <h6>Logout</h6>
                    </Link>
         
            </div>


        <div className='table-wrapper'>
            <table className="styled-table">
        <thead>
            <tr className='calumn'>
                <th>Photo</th>
                <th>full Name</th>
                <th>Party</th>
                <th>Post</th>
                <th>Action</th>
            
            </tr>
        </thead>
        <tbody className='table-body'>
        {data.map((candidateData)=>(
            <tr className ='field-holder' key={candidateData.id}>
                <td>
                    {candidateData.photo && (<img className='photo' src={`data:image/jpeg;base64,${candidateData.photo}`}/>)}
                    
                </td>
                <td>{candidateData.fullName}</td>
                <td>{candidateData.party}</td>
                <td>{candidateData.post}</td>
                <td>
                <input
                    type="checkbox"
                    id={`user-${candidateData.id}`}
                    name={candidateData.id}
                    value={"1"}
                    checked={selectedUser === candidateData.id}
                    onChange={() => handleVote(candidateData.id)}
                    disabled={isChecked}
            />
               
                </td>
        
            </tr>
        ))} 
  
            <tr className="active-row">
                <td>Melissa</td>
                <td>5150</td>
                <td>Melissa</td>
                <td>5150</td>
                <td>Melissa</td>
                
            </tr>
    
        </tbody>
            </table>
                <div className='progress-page'>
                <div className='pagingButton'>
                    <button className='left' onClick={() =>setCurrentPage(currentPage -1)} disabled={currentPage === 0}/>
                    <p>page: {currentPage + 1} of {totalPages}</p>
                    <button className='right' onClick={() =>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}/>
                </div>

                <div className='progress-bar'>
                    {isProcess ? (<><h5>processing your vote: {progress}%</h5>
                    <progress value={progress} max={100}></progress></>) : ('')}          
                </div>
                </div>


        </div>
</>) : (<Unauthenticated/>)}


    </div>
  )
}

export default VotingPage
