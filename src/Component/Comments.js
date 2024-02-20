import React, { useEffect, useState } from 'react'

import { Link, redirect, useNavigate } from 'react-router-dom';
import '../Stlyles/Comments.css'
import profileImage from '../assets/icons8-user-100.png'
import homeImage from '../assets/icons8-home.svg'
import vStationImage from '../assets/icons8-ratings-100.png'
import logoutImage from '../assets/icons8-logout-100.png'
import logoImage from '../assets/icons8-elections-100.png'
import resultImage from '../assets/icons8-results-100.png'
import axios from 'axios';
import AddComment from './AddComment';


function Comments({email}) {
    
    const navigate = useNavigate();
    const [isLogedin, setisLogedin] = useState(false);
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 3;
    const [add,setAdd] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
          
          const voterEmail = JSON.parse(localStorage.getItem('email'));
          setisLogedin(voterEmail);
        
        };
    
        checkAuthentication();
      }, []);

      useEffect(() =>{
        results()
      },[currentPage,pageSize,totalPages]);

      const results = async () =>{
        const response = await axios.get(`http://localhost:8080/comments/pagination/${currentPage}/${pageSize}`);
        setComments(response.data.content);
        setTotalPages(response.data.totalPages);

      }

      const deleteComment = async (comment_id) =>{
        await axios.delete(`http://localhost:8080/comments/delete/${comment_id}`);
        results();
        setCurrentPage(currentPage)
      }

      const onCommentSubmit =async (e,comment,user)=>{
        e.preventDefault();

        try {
                      
            if(comment ==''){
                alert('Comment is required');
            }else if(!isLogedin){
              alert('you are requirde to longin to comment');
            }
            else{  
    
                await axios.post(`http://localhost:8080/voters/saveComment/${isLogedin}`,user);
                alert('Commented successfully'); 
                setAdd(false);
                results()
                
                
            }
        } catch (error) {
            alert( error);
            console.log(error)
        }
      
    }

      const logout = () => {
        try {

          localStorage.clear();
          navigate('/comments');
          window.location.reload();
          window.close();
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
      
      const handleOnCancel = (e) =>{
        e.preventDefault()
        setAdd(false)
      }


  return (
    <div className='overviewcontainer'>
        <div className='nav-bar'>
                <div className='logo'>
                    <img src={logoImage}/>
                    <p>EaziVote</p>
                </div>
                    <Link className='home' to={'/'}>
                          <img src={homeImage}/>
                           <h6>Home</h6> 
                     </Link>

                    <Link className='home' to={'/profile'}>
                        <img src={profileImage}/>
                          <h6>Profile</h6>  
                    </Link>

                    <Link className='v-station' to={'/voting'}>
                        <img src={vStationImage}/>
                          <h6>Station</h6>  
                    </Link>

                    <Link className='profile' to={'/results'}>
                        <img src={resultImage}/>
                          <h6>Results</h6>  
                    </Link>
                    {isLogedin ? ( 
                    <Link className='logout' onClick={logout}>
                        <img src={logoutImage}/>
                          <h6>Logout</h6> 
                    </Link>) : ('')}

                  </div>

                  <div class="comments-container">
                  <div className='aling-comment'>
                   {add ? (<AddComment handleOnCancel = {handleOnCancel} onCommentSubmit = {onCommentSubmit}/>) : ('')} 
                    <div className='form'></div>
                  {comments.map((data) =>
                  
                   <div className='comment-content'key={data.id}>
                      
                      <div className='image'></div>
                      <div className='triangle-wrapper'>
                      <div className='trianle'></div>

                      
                      <div className='comment' >

                            <div className='top-details-wrapper'>
                              <div className='details'>
                                <h5>{data.voterName}</h5>
                                {data.voterEmail === isLogedin ? (<h6></h6>) : ('')}                               
                                <p>{data.commentedTime}</p>
                              </div>
                                {data.voterEmail === isLogedin ? (<button onClick={() =>deleteComment(data.id)}>Delete</button>) : ('')}

                            </div>
                            <hr/>
                            <p className='comment-text'>{data.comment}</p>
                            </div> 
                            
                      </div>

                  </div>
                  
                   )}
                   </div>

                    <div className='pagingButtonComment'>
                    <button className='leftComment' onClick={() =>setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 0}/>
                    <p>page: {currentPage + 1} of {totalPages}</p>
                    <button className='rightComment' onClick={() =>setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === totalPages - 1}/>
                    <button className='add-button' onClick={() =>setAdd(true)}>Add</button>
                </div>
	                </div>
            


    </div>
  )
}

export default Comments
