import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../assets/icons8-elections-100.png';
import addIcon from '../assets/icons8-plus.svg';
import '../Stlyles/Candidate.css'


function Candidate({email}) {

    const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const [candidate, setCandidate] = useState({
    fullName: '',
    party: '',
    post: '',
  });

  const { fullName, party, post} = candidate;

  const handleInputChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
    
  };

  const inputRef = useRef(null);

  const handleImageFile = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;
        setCandidate({
          ...candidate, 
          photo: e.target.files[0],
        });
        setImage(dataURL);
      
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const dataToSend = new FormData();
    dataToSend.append('fullName', candidate.fullName);
    dataToSend.append('party', candidate.party);
    dataToSend.append('post', candidate.post);
    dataToSend.append('photo', candidate.photo);
    dataToSend.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    console.log(candidate.photo)
    try {
        if(image){ 
            await axios.post("http://localhost:8080/candidate/save", dataToSend, {
        headers: {'Content-Type': 'multipart/form-data'}});
       alert('Data sent successfully!');
      
      setCandidate({
        fullName: '',
        party: '',
        post: '',
        photo: null,
      });
      setImage(null);
        }else{ alert('image required')}
      
    } 
    catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

  return (
    <div className='candidate-container'>
     
      <div className='bckg-reg'>
            <h1>Register Candidate</h1>
      </div>

      <div className='mainw-rapper'>
          <div className='form-image-wrapper'>
            <div className='imageFile'>
              <div className='imageFile__holder'>
                {image ? (
                  <img className='image-selected' src={image} alt='upload' />
                ) : (
                  <div className='image-default-wrapper'>
                    <img className='image-default' src={logoImage} alt='upload' />
                  </div>
                )}
              </div>

              <div className='plus-icon' onClick={handleImageFile}>
                <input
                  type='file'
                  ref={inputRef}
                  accept='image/*'
                  style={{display:'none'}}
                  onChange={handleImageChange}
                  required
                ></input>
                <img className='add-icon' src={addIcon} alt='add' />
              </div>
            </div>

            <form
              className='candidateForm'
              onSubmit={handleSubmit}
            >
              <input
                type='text'
                className='formControl-candidate'
                placeholder='Name'
                onChange={(e) => handleInputChange(e)}
                value={fullName}
                name='fullName'
              />
              <input
                type='text'
                className='formControl-candidate'
                placeholder='Party'
                onChange={(e) => handleInputChange(e)}
                value={party}
                name='party'
              />
              <input
                type='text'
                className='formControl-candidate'
                placeholder='Post'
                onChange={(e) => handleInputChange(e)}
                value={post}
                name='post'
              />

              <div className='buttoncandidate'>
                <button className='post' type='submit'>
                  Submit
                </button>
                <Link className='back-post' to={'/admin'}>
                  Back
                </Link>
              </div>
            </form>
            
          </div>
      </div>
      
      
    </div>
  );
}

export default Candidate;
