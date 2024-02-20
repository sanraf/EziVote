
import {  BrowserRouter as Router,Route,Routes, useNavigate  } from 'react-router-dom';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { useEffect, useState } from 'react';
import Overview from './Component/Comments';
import ForgotPassword from './Component/ForgotPassword';
import Results from './Component/Results';
import axios from 'axios';
import VotingPage from './Component/VotingPage';
import VoterProfile from './Component/VoterProfile';
import Candidate from './Component/Candidate';
import ViewVoters from './Component/ViewVoters';
import ViewCandidate from './Component/ViewCandidate';
import Admin from './Component/Admin';
import Popup from './Component/Popup';
import Comments from './Component/Comments';

function App() {

const [globalData,setGlobalData] = useState([]);
const [email,setEmail] = useState('');
const [adminData,setadminData] = useState([])


 
  useEffect(()=>{
    loadVoters ();
    setEmail(JSON.parse(localStorage.getItem('email') || '[]'));
  },[]);

  const loadVoters =async ()=>{
  const respond = await axios.get('http://localhost:8080/voters/all');
    setGlobalData(respond.data);
}

  useEffect(()=>{
    const result = async () =>{
      const respond = await axios.get('http://localhost:8080/voters/admin');
      setadminData(respond.data);
    }
    result()},[])

function getEmail(email){
    localStorage.setItem('email',JSON.stringify(email));
   
}




  return (
    <div className="App">
      
      <Router>
        
        <Routes>
        <Route exact path='/' element = { <Home email = {email} data = {globalData}/>}/>
        <Route exact path='/login' element = { <Login data = {globalData}  getEmail = {getEmail}/>}/>
        <Route exact path='/signup' element = { <Signup data = {globalData}/>}/>
        <Route exact path='/comments' element = { <Comments data = {globalData} email = {email}/>}/>
        <Route exact path='/forgotpassword' element = { <ForgotPassword data = {globalData}/>}/>
        <Route exact path='/results' element = { <Results data = {globalData} email = {email}/>} />
        <Route exact path='/voting' element = { <VotingPage data = {globalData} email = {email}/>} />
        <Route exact path='/profile' element = { <VoterProfile data = {globalData} email = {email} />} />
        <Route exact path='/candidate' element = { <Candidate email = {email}/>} />
        <Route exact path='/viewvoters' element = { <ViewVoters email = {email}/>} />
        <Route exact path='/viewcandidates' element = { <ViewCandidate email = {email}/>} />
        <Route exact path='/admin' element = { <Admin/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
