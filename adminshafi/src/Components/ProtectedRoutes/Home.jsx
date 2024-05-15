import { Grid,} from "@mui/material";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { Container, Row, Col } from 'react-bootstrap';
import './home.css'
import axios from 'axios'
import { client } from '../clientaxios/Clientaxios';

const Home = () => {
  const [greeting, setGreeting] = useState('');
  const [tourForms, setTourForms] = useState([]);
  const [readArray, setReadArray] = useState([]);
  useEffect(() => {
    fetchTourForms();
}, []);
  const fetchTourForms = () => {
    client.get('/tourform/get')
        .then(response => {
            setTourForms(response.data);
            const read = Array(response.data.length).fill(false);
            setReadArray(read);
        })
        .catch(error => console.error('Error fetching tour forms:', error));
}; const handleRead = (index) => {
  setReadArray(prev => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];
      return newArray;
  });
};


  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(getGreeting(currentHour));
  }, []);



  const getGreeting = (hour) => {
    if (hour >= 5 && hour < 12) {
      return 'Good Morning Admin';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon Admin';
    } else {
      return 'Good Evening Admin';
    }
  };

  return (
<>
      <Grid item xs={6} />
      <div className="">
        {/*  Row 1 */}
        <Container fluid>
          <Row>
            <Col xs={12}>
              <h1   className="custom-heading" >{greeting}</h1>
              <h4>Admission data</h4>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <div className="container-fluid">
              <div className="container mt-4" style={{margin:'10px'}}>
{/* <h4 >Admission Data</h4> */}
<div className='table-responsive mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Guest Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Tour Package</th>
                            <th>Message</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {tourForms.map((tourForm, index) => (
                            <tr key={tourForm._id}>
                                <td>{tourForm.guestName}</td>
                                <td>{tourForm.email}</td>
                                <td>{tourForm.phoneNumber}</td>
                                <td>{tourForm.tourPackage}</td>
                                <td>{readArray[index] && tourForm.message}   <button className="btn btn-warning" onClick={() => handleRead(index)}>
                                        {readArray[index] ? 'Hide Message' : 'Read Message'}
                                    </button></td>
                             
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
    

              </div>
            </Col>
          </Row>
        </Container>
      </div>
      </>
   
  );
};

export default Home;
