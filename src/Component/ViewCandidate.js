
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Stlyles/ViewCandidate.css'
import { Link } from 'react-router-dom';

function ViewCandidate() {

    const [candidate,setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5;
    
  

    useEffect(()=>{

      result();
  
  },[currentPage,pageSize]);

  const result = async ()=>{

    try {
      const response = await axios.get(`http://localhost:8080/candidate/pagination/${currentPage}/${pageSize}`);
      setData(response.data.content);
        setTotalPages(response.data.totalPages);
    } catch (error) {
        console.error(error);
    }

};

const deleteCandidate = async (id) =>{
    await axios.delete(`http://localhost:8080/candidate/delete/${id}`);
    result();
}


  return (
    <div className='container-table'>
      <Link className='back-arrow' to={'/admin'}>&#8592;</Link>
        <h3 className='title'>List of candidate</h3>
        <div className=' px-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Full name</th>
      <th scope="col">Party</th>
      <th scope="col">Post</th>
      <th scope="col">Votes</th>
      <th scope="col">Photo</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
 
    {candidate.map((candidate)=>(
    <tr scope="row" key={candidate.id}>
      <th >{candidate.id}</th>
      <td>{candidate.fullName}</td>
      <td>{candidate.party}</td>
      <td>{candidate.post}</td>
      <td>{candidate.voteCount}</td>
      <td><img className='photo' src={`data:image/jpeg;base64,${candidate.photo}`}/></td>
    
      <td>
        <button className='btn btn-danger mx-2 my-2'onClick={()=>deleteCandidate(candidate.id)}>Delet</button>
    </td>
    </tr>
    ))}

  </tbody>
</table>
        </div>

        <div className='pagingButtonResult'>
                    <button className='leftResult' onClick={()=>setCurrentPage(currentPage - 1)} disabled={currentPage === 0}/>
                    <p>page: {currentPage + 1} of {totalPages}</p>
                    <button className='rightResult' onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}/>
                </div>
    </div>
  )
}

export default ViewCandidate
