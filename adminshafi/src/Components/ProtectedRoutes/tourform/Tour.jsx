import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { client } from '../../clientaxios/Clientaxios';
import TourModel from './TourModel';

export default function Tour() {
    const [guestName, setGuestName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tourPackage, setTourPackage] = useState('');
    const [message, setMessage] = useState('');
    const [editingTourFormId, setEditingTourFormId] = useState(null);
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
    };

    const handleDeleteTourForm = async (tourFormId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this tour form data!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                await client.delete(`/tourform/${tourFormId}`);
                await Swal.fire('Deleted!', 'Tour form data has been deleted.', 'success');
                fetchTourForms();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Tour form data is safe :)', 'info');
            }
        } catch (error) {
            console.error('Error deleting tour form:', error);
            Swal.fire('Error', 'Failed to delete tour form data.', 'error');
        }
    };

    const handleFormSubmit = async (field, value) => {
        try {
            const data = { [field]: value };
            await client.post('/tourform/submit', data);
            await Swal.fire('Success!', 'Tour form submitted successfully.', 'success');
            fetchTourForms();
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire('Error', 'Failed to submit tour form.', 'error');
        }
    };

    const handleRead = (index) => {
        setReadArray(prev => {
            const newArray = [...prev];
            newArray[index] = !newArray[index];
            return newArray;
        });
    };
    const [newTourPackage, setNewTourPackage] = useState('');

    const handleAddTourPackage = async () => {
        try {
            const response = await client.post('/tourform/add-package', { packageName: newTourPackage });
            if (response.data && response.data.message) {
                // Show a success message if the request was successful
                Swal.fire('Success!', response.data.message, 'success');
                // Optionally, you can fetch the updated list of tour packages from the backend
                // and update the state to reflect the changes immediately
                setNewTourPackage(''); // Reset the new tour package input field
            } else {
                // Show an error message if the response does not contain the expected message
                Swal.fire('Error', 'Failed to add tour package. Unexpected response from server.', 'error');
            }
        } catch (error) {
            // Show an error message if the request fails
            console.error('Error adding tour package:', error);
            Swal.fire('Error', 'Failed to add tour package. Please try again later.', 'error');
        }
    };
    
    return (
        <div className="container">
            <h4>Tour Forms</h4>

            <h4>Add New Tour Package</h4>
            <form onSubmit={handleAddTourPackage}>
                <div className="mb-3">
                    <label htmlFor="newTourPackageInput" className="form-label">Tour Package Name</label>
                    <input type="text" className="form-control" id="newTourPackageInput" value={newTourPackage} onChange={(e) => setNewTourPackage(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Package</button>
            </form>
            <div className='table-responsive mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Guest Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Tour Package</th>
                            <th>Message</th>
                            <th>Actions</th>
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
                                <td>
                                 
                                    <button className="btn btn-warning ms-2" onClick={() => handleDeleteTourForm(tourForm._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <TourModel/>
        </div>
    );
}
