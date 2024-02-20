import React, { useState } from 'react'
import '../Stlyles/Comments.css'
import axios from 'axios';
function AddComment({handleOnCancel,onCommentSubmit}) {

    const voterEmail = JSON.parse(localStorage.getItem('email'));

    const [user,setComment] = useState({comment:''});

    const {comment} = user;

    const onChange = (e)=>{
        setComment({...user,[e.target.name]:e.target.value})
    }



  return (
    <div>
      <form className='comment-form' autoComplete='off' onSubmit={(e) =>onCommentSubmit(e,comment,user)}>

        <input className='comment-input' type='text' placeholder='Comment' onChange={(e)=>onChange(e)} value={comment} name='comment'/>
        <div className='action-button'>
            <button>Comment</button>
            <button onClick={(e) =>{handleOnCancel(e)}}>Cancel</button>
        </div>

      </form>
    </div>
  )
}

export default AddComment
