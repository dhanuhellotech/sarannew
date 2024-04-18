import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { client } from '../../clientaxios/Clientaxios';

export default function VehicleModel() {
    const [modelName, setModelName] = useState('');
    const [vehicleModels, setVehicleModels] = useState([]);
    const [editingModelId, setEditingModelId] = useState(null);
    const [editingModelName, setEditingModelName] = useState('');

    useEffect(() => {
        fetchVehicleModels();
    }, []);

    const fetchVehicleModels = () => {
        client.get('/vecform/vehicle-models')
            .then(response => {
                setVehicleModels(response.data);
            })
            .catch(error => console.error('Error fetching vehicle models:', error));
    };

    const handleDeleteModel = async (modelId) => {
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
                await client.delete(`/vecform/vehicle-models/${modelId}`);
                await Swal.fire('Deleted!', 'Vehicle model has been deleted.', 'success');
                fetchVehicleModels();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Vehicle model deletion cancelled.', 'info');
            }
        } catch (error) {
            console.error('Error deleting vehicle model:', error);
            Swal.fire('Error', 'Failed to delete vehicle model.', 'error');
        }
    };

    const handleEditModel = (modelId, modelName) => {
        setEditingModelId(modelId);
        setEditingModelName(modelName);
    };

    const handleCancelEdit = () => {
        setEditingModelId(null);
        setEditingModelName('');
    };
    const handleModelSubmit = async () => {
        try {
            await client.post('/vecform/vehicle-models', { modelName });
            await Swal.fire('Success!', 'Vehicle model added successfully.', 'success');
            setModelName(''); // Reset model name input field
            fetchVehicleModels();
        } catch (error) {
            console.error('Error adding vehicle model:', error);
            Swal.fire('Error', 'Failed to add vehicle model.', 'error');
        }
    };
    
    const handleUpdateModel = async () => {
        try {
            await client.put(`/vecform/vehicle-models/${editingModelId}`, { modelName: editingModelName });
            await Swal.fire('Success!', 'Vehicle model updated successfully.', 'success');
            setEditingModelId(null);
            setEditingModelName('');
            fetchVehicleModels();
        } catch (error) {
            console.error('Error updating vehicle model:', error);
            Swal.fire('Error', 'Failed to update vehicle model.', 'error');
        }
    };

    return (
        <div className="container">
            <h4>Vehicle Models</h4>

            <form onSubmit={handleModelSubmit}>
                <div className="mb-3">
                    <label htmlFor="modelNameInput" className="form-label">Model Name</label>
                    <input type="text" className="form-control" id="modelNameInput" value={modelName} onChange={(e) => setModelName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Model</button>
            </form>

            <div className='table-responsive mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Model Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleModels.map(model => (
                            <tr key={model._id}>
                                <td>
                                    {editingModelId === model._id ? (
                                        <input
                                            type="text"
                                            value={editingModelName}
                                            onChange={(e) => setEditingModelName(e.target.value)}
                                        />
                                    ) : (
                                        model.modelName
                                    )}
                                </td>
                                <td>
                                    {editingModelId === model._id ? (
                                        <>
                                            <button className="btn btn-success mr-2" onClick={handleUpdateModel}>Save</button>
                                            <button className="btn btn-danger ms-2 mr-2" onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <button className="btn btn-primary ms-2 mr-2" onClick={() => handleEditModel(model._id, model.modelName)}>Edit</button>
                                    )}
                                    <button className="btn btn-primary ms-2" onClick={() => handleDeleteModel(model._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
