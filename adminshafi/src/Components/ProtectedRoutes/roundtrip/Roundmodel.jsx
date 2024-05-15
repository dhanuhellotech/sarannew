import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { client } from '../../clientaxios/Clientaxios';

export default function RoundModel() {
    const [tourPackagename, setTourPackagename] = useState('');
    const [tourModels, setTourModels] = useState([]);
    const [editingTourModelId, setEditingTourModelId] = useState(null);
    const [editingTourModelName, setEditingTourModelName] = useState('');

    useEffect(() => {
        fetchTourModels();
    }, []);

    const fetchTourModels = () => {
        client.get('/tourform')
            .then(response => {
                setTourModels(response.data);
            })
            .catch(error => console.error('Error fetching tour models:', error));
    };

    const handleDeleteTourModel = async (modelId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this tour model!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                await client.delete(`/tourform/tour-models/${modelId}`);
                await Swal.fire('Deleted!', 'Tour model has been deleted.', 'success');
                fetchTourModels();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Tour model deletion cancelled.', 'info');
            }
        } catch (error) {
            console.error('Error deleting tour model:', error);
            Swal.fire('Error', 'Failed to delete tour model.', 'error');
        }
    };

    const handleEditTourModel = (modelId,  tourPackagename) => {
        setEditingTourModelId(modelId);
        setEditingTourModelName( tourPackagename);
    };

    const handleCancelEdit = () => {
        setEditingTourModelId(null);
        setEditingTourModelName('');
    };

    const handleModelSubmit = async () => {
        try {
            await client.post('/tourform/tour-models', { tourPackagename });
            await Swal.fire('Success!', 'Tour model added successfully.', 'success');
            setTourPackagename(''); // Reset model name input field
            fetchTourModels();
        } catch (error) {
            console.error('Error adding tour model:', error);
            Swal.fire('Error', 'Failed to add tour model.', 'error');
        }
    };
    
    const handleUpdateModel = async () => {
        try {
            await client.put(`/tourform/tour-models/${editingTourModelId}`, { tourPackagename: editingTourModelName });
            await Swal.fire('Success!', 'Tour model updated successfully.', 'success');
            setEditingTourModelId(null);
            setEditingTourModelName('');
            fetchTourModels();
        } catch (error) {
            console.error('Error updating tour model:', error);
            Swal.fire('Error', 'Failed to update tour model.', 'error');
        }
    };

    return (
        <div className="container">
            <h4>Tour Models</h4>

            <form onSubmit={handleModelSubmit}>
                <div className="mb-3">
                    <label htmlFor="tourPackagenameInput" className="form-label">Package Name</label>
                    <input type="text" className="form-control" id="tourPackagenameInput" value={tourPackagename} onChange={(e) => setTourPackagename(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Add Package</button>
            </form>

            <div className='table-responsive mt-3'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tourModels.map(model => (
                            <tr key={model._id}>
                                <td>
                                    {editingTourModelId === model._id ? (
                                        <input
                                            type="text"
                                            value={editingTourModelName}
                                            onChange={(e) => setEditingTourModelName(e.target.value)}
                                        />
                                    ) : (
                                        model.tourPackagename
                                    )}
                                </td>
                                <td>
                                    {editingTourModelId === model._id ? (
                                        <>
                                            <button className="btn btn-success mr-2" onClick={handleUpdateModel}>Save</button>
                                            <button className="btn btn-danger ms-2 mr-2" onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <button className="btn btn-warning ms-2 mr-2" onClick={() => handleEditTourModel(model._id, model.tourPackagename)}>Edit</button>
                                    )}
                                    <button className="btn btn-primary ms-2" style={{backgroundColor:'#0D2259'}} onClick={() => handleDeleteTourModel(model._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
