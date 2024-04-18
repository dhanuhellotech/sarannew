import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { client } from '../../clientaxios/Clientaxios';
import VehicleModel from './VechicleModel';
export default function VehicleAdminPanel() {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicleModel, setNewVehicleModel] = useState('');
    const [newlyAddedModels, setNewlyAddedModels] = useState([]);
    const [updatedModelName, setUpdatedModelName] = useState('');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        client.get('/vecform/vecget')
            .then(response => {
                setVehicles(response.data);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
                Swal.fire('Error', 'Failed to fetch vehicle data.', 'error');
            });
    };

    const handleAddVehicleModel = async () => {
        try {
            const response = await client.post('/vecform/vehicle-models', { modelName: newVehicleModel }); // Adjust the endpoint if necessary
            if (response.data && response.data.message) {
                Swal.fire('Success!', response.data.message, 'success');
                setNewVehicleModel('');
                fetchVehicles();
                fetchNewlyAddedModels(); // Fetch newly added models
            } else {
                Swal.fire('Error', 'Failed to add new vehicle model.', 'error');
            }
        } catch (error) {
            console.error('Error adding vehicle model:', error);
            Swal.fire('Error', 'Failed to add new vehicle model. Please try again later.', 'error');
        }
    };

    const handleDeleteVehicleModel = async (vehicleId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this vehicle model!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                await client.delete(`/vehicles/${vehicleId}`);
                Swal.fire('Deleted!', 'Vehicle model has been deleted.', 'success');
                fetchVehicles();
                fetchNewlyAddedModels(); // Fetch newly added models
            }
        } catch (error) {
            console.error('Error deleting vehicle model:', error);
            Swal.fire('Error', 'Failed to delete vehicle model.', 'error');
        }
    };

    const fetchNewlyAddedModels = async () => {
        try {
            const response = await client.get('/vecform/vehicle-models'); // Replace with the appropriate endpoint
            setNewlyAddedModels(response.data);
        } catch (error) {
            console.error('Error fetching newly added models:', error);
            Swal.fire('Error', 'Failed to fetch newly added models.', 'error');
        }
    };

    return (
        <div className="container">
            <h4>Vehicle Booking Form</h4>
       
            <div className='table-responsive mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>guestName</th>
                            <th>email</th>
                            <th>address</th>
                            <th>phoneNumber</th>
                            <th>Vehicle Model</th>
                            <th>pickUpDate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle._id}>
                                <td>{vehicle.guestName}</td>
                                <td>{vehicle.email}</td>
                                <td>{vehicle.address}</td>
                                <td>{vehicle.phoneNumber}</td>
                                <td>{vehicle.vehicleModel}</td>
                                <td>{vehicle.pickUpDate}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDeleteVehicleModel(vehicle._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

         
            <VehicleModel/>
        </div>
    );
}
