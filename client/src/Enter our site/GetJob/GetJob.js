import React from 'react';
import { Table } from 'react-bootstrap';
import { Link ,useParams } from 'react-router-dom';
import { getAuthUser } from "../../Storage/Storage.js";
import { useState ,useEffect} from 'react';
import axios from 'axios';
const GetJob = () => {
  let{id}=useParams();
    const auth = getAuthUser();
    const [job_application, setuser] = useState({
      loading: true,
      results: [],
      err: null,
      reload: 0,
    });
useEffect(()=>{
    setuser({ ...job_application, loading: true });
    axios
      .get("http://localhost:7878/api/jobs/",
    {headers:{token:auth.token,"Content-Type":"multipart/form-data"}} )
    .then((resp) => {
        setuser({ ...job_application, results: resp.data, loading: false, err: null });


    })
    .catch((err) => {
        setuser({
        ...job_application,
        loading: false,
        err: " something went wrong, please try again later ! ",
        });
    });
  }, [job_application.reload]);

 
  console.log(job_application);

    return (
        <div>
        <h1> Applied User</h1>
        <Table striped bordered hover size='1m'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>user_id</th>
                    <th> Accept</th>
                  <th> Qualification</th>
                  <th>Max_candidate_number</th>
                  
                    <th>offer </th>
                    <th>description </th>
                    <th>position</th>
                    
                    </tr>
                    </thead>
                    <tbody>
                    {job_application.results.map((user) => (   
                    <tr key={user.job_id}>
                    <td> {user.user_id} </td>
                    <td> {user.acceptance} </td>
                    <td> {user.qualification} </td>
                    
                    <td> {user.Max_candidate_number} </td>
                    
                    <td> {user.offer} </td>
                    <td> {user.description} </td>
                    <td> {user.position} </td>

                    
        
       
       
        
       
        


                </tr>   
 ))}
 </tbody>
    </Table>


        </div>
    );
};

export default GetJob;