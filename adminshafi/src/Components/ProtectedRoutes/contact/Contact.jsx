import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { client } from '../../clientaxios/Clientaxios';

const ContactPage = () => {
  const [contactDataList, setContactDataList] = useState([]);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await client.get('/contacts');
      setContactDataList(response.data);
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this contact!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await client.delete(`/contacts/${id}`);
        setContactDataList((prevData) => prevData.filter(contact => contact._id !== id));
        Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting contact data:', error);
        Swal.fire('Error!', 'Failed to delete contact.', 'error');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Contact Page</h1>
      <table className="table table-striped table-bordered text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Message</th>
            <th>Category</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contactDataList.map(contact => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
              <td>{contact.message}</td>
              <td>{contact.category}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(contact._id)}
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

export default ContactPage;
