import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { client } from '../../clientaxios/Clientaxios';
import axios from 'axios'
import RoundModel from './Roundmodel';

export default function Round() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [numberOfPersons, setNumberOfPersons] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [readArray, setReadArray] = useState([]);
    useEffect(() => {
        fetchBookings();
    }, []);
    
    const fetchBookings = () => {
        client.get('/roundtrip')
            .then(response => {
                setBookings(response.data);
                const read = Array(response.data.length).fill(false);
                setReadArray(read);
            })
            .catch(error => console.error('Error fetching bookings:', error));
    };
    
    const handleDeleteBooking = async (bookingId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this booking!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                await client.delete(`/roundtrip/${bookingId}`);
                await Swal.fire('Deleted!', 'Booking has been deleted.', 'success');
                fetchBookings();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Booking is safe :)', 'info');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            Swal.fire('Error', 'Failed to delete booking.', 'error');
        }
    };

    const handleFormSubmit = async () => {
        try {
            const data = {
                name,
                email,
                mobileNo,
                vehicleType,
                numberOfPersons,
                pickupDate,
                pickupLocation,
                dropLocation,
                returnDate
            };
            await client.post('/roundtrip', data);
            await Swal.fire('Success!', 'Booking created successfully.', 'success');
            fetchBookings();
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire('Error', 'Failed to create booking.', 'error');
        }
    };


    return (
        <div className="container">
 

          

            {/* Table to display existing bookings */}
            <div className="">
                <div className="">Existing Bookings</div>
                <div className="table-responsive mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No</th>
                                <th>Vehicle Type</th>
                                <th>Number of Persons</th>
                                <th>Pickup Date</th>
                                <th>Pickup Location</th>
                                <th>Drop Location</th>
                                <th>Return Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {bookings.map((booking, index) => (
    <tr key={booking._id}>
        {/* Populate table cells with booking data */}
        {/* Add button to toggle message visibility */}
        <td>{booking.name}</td>
        <td>{booking.email}</td>
        <td>{booking.mobileNo}</td>
        <td>{booking.vehicleType}</td>
        <td>{booking.numberOfPersons}</td>
        {/* Check if pickupDate is defined before splitting */}
        <td>{booking.pickupDate ? booking.pickupDate.split('T')[0] : ''}</td>
        <td>{booking.pickupLocation}</td>
        <td>{booking.dropLocation}</td>
        {/* Check if returnDate is defined before splitting */}
        <td>{booking.returnDate ? booking.returnDate.split('T')[0] : ''}</td>
        {/* Display message only if readArray[index] is true */}
        <td>
            <button className="btn btn-warning" onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
        </td>
    </tr>
))}


                        </tbody>
                    </table>
                </div>
            </div>

 <RoundModel/>
        </div>
    );
}
