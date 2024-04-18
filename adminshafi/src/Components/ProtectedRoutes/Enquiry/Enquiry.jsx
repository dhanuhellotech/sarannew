import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { client } from '../../clientaxios/Clientaxios';
import Swal from 'sweetalert2';

const EnquiryPage = () => {
  const [enquiryDataList, setEnquiryDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get('/enquiry/enquiries');
        // Check if the response data is defined and is an array
        if (response.data && Array.isArray(response.data)) {
          setEnquiryDataList(response.data);
        } else {
          console.error('Enquiry data is not an array or undefined:', response.data);
        }
      } catch (error) {
        console.error('Error fetching enquiry data:', error);
      }
    };
    
    
  
    fetchData();
  }, []);
  
  const handleDelete = async (id) => {
    // Confirm deletion with SweetAlert
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this enquiry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await client.delete(`/enquiry/enquiries/${id}`);
        setEnquiryDataList((prevData) => prevData.filter(enquiryData => enquiryData._id !== id));
        Swal.fire(
          'Deleted!',
          'Enquiry has been deleted.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting enquiry data:', error);
        if (error.response && error.response.data && error.response.data.error) {
          console.error('Server Error:', error.response.data.error);
        } else {
          console.error('Error deleting data. Please try again.');
        }
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your enquiry is safe :)',
        'error'
      );
    }
  }; 

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false, // Use 24-hour format
      timeZone: 'UTC' // Optionally, specify the time zone
    };
    return dateTime.toLocaleString('en-US', options);
  };
  const mapDayToName = (day) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[day];
  };
  return (
    <div className="container mt-4" style={{ margin: '5px' }}>
      <h1 className="text-center">Enquiry Page </h1>
      <table className="table table-striped table-bordered text-left" style={{width:'100%'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Message</th>
            <th>dateOfBirth</th>
            <th>address</th>
            <th>DateTime</th>
            <th>preferredDays</th>
            <th>TimeToCall</th>
            <th>AppointmentType</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {enquiryDataList.map(enquiryData => (
            <tr key={enquiryData._id}>
              <td>{enquiryData.name}</td>
              <td>{enquiryData.email}</td>
              <td>{enquiryData.phoneNumber}</td>
        
              <td>{enquiryData.subject}</td>
              <td>{enquiryData.message}</td>
              <td>{enquiryData.dateOfBirth.split('T')[0]}</td>
              <td>{enquiryData.address}</td>
              <td>{formatDateTime(enquiryData.preferredAppointmentDateTime)}</td>


              <td>{mapDayToName(enquiryData.preferredDays)}</td>
              
                 <td>{enquiryData.bestTimeToCall}</td>
                <td>{enquiryData.appointmentType}</td>

              <td>
                <button
                  className="btn btn-info"
                  style={{ backgroundColor: '#6f42c1',margin:'5px' }}
                  onClick={() => handleDelete(enquiryData._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiryPage;
