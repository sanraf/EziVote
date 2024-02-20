import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Stlyles/view.css'
import { Link, useNavigate, useParams } from 'react-router-dom';

function ViewVoters() {

    const [voter,setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 4;
    
    useEffect(()=>{

      result();
  },[currentPage,pageSize]);
  
  const result = async ()=>{

    try {
        const response = await axios.get(`http://localhost:8080/voters/allPage${currentPage}/${pageSize}`);
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
    } catch (error) {
        console.error(error);
    }

};


const deletevoter = async (id) =>{
    await axios.delete(`http://localhost:8080/voters/delete/${id}`);
    result();
}

  return (
    <div className='container-table'>
      
      <Link className='back-arrow' to={'/admin'}>&#8592;</Link>
        <h3 className='title'>List of voters</h3>

        <div className='px-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Surname</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Password</th>
      <th scope="col">Image</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {console.log(voter)}
    {voter.map((voter)=>(
    <tr scope="row" key={voter.id}>
      <th >{voter.id}</th>
      <td>{voter.name}</td>
      <td>{voter.surname}</td>
      <td>{voter.email}</td>
      <td>{voter.phone}</td>
      <td>{voter.password}</td>
      <td>null</td>
      <td>
        {/* <Link className='btn btn-primary mx-2 my-2' >View</Link>
        <Link  className='btn btn-outline-primary mx-2' >Edit</Link> */}
        <button className='btn btn-danger mx-2 my-2'onClick={()=>deletevoter(voter.id)}>Delet</button>
    </td>
    </tr>
    ))}

  </tbody>
</table>
        </div>
        <div className='pagingButtonResult'>
                    <button className='leftResult' onClick={() =>setCurrentPage(currentPage - 1)} disabled={currentPage === 0}/>
                    <p>page: {currentPage + 1} of {totalPages}</p>
                    <button className='rightResult' onClick={() =>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}/>
                </div>
    </div>
  )
}

export default ViewVoters