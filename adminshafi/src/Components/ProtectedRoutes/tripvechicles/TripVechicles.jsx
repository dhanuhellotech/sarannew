import React, { useState, useEffect } from 'react';
import { client } from '../../clientaxios/Clientaxios';
import Swal from 'sweetalert2';

export default function TripVehicles() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [driverAllowance, setDriverAllowance] = useState(0);
  const [oneWayTrip, setOneWayTrip] = useState('');
  const [roundTrip, setRoundTrip] = useState('');
  const [state, setState] = useState('');
  const [permit, setPermit] = useState('');
  const [tollGates, setTollGates] = useState('');
  const [file, setFile] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
      if (!editingVehicle) {
        // Check if all required fields are filled
        if (!name || !price || !driverAllowance || !oneWayTrip || !roundTrip || !state || !permit || !tollGates || !file) {
          Swal.fire('Error', 'Please fill all the fields', 'error');
          return;
        }
      }
    
      const requestData = new FormData();
      requestData.append('name', name);
      requestData.append('price', price);
      requestData.append('driverAllowance', driverAllowance);
      requestData.append('oneWayTrip', oneWayTrip);
      requestData.append('roundTrip', roundTrip);
      requestData.append('state', state);
      requestData.append('permit', permit);
      requestData.append('tollGates', tollGates);
      if (file) {
        requestData.append('image', file);
      }
    
      if (editingVehicle) {
        await client.put(`/trip/${editingVehicle._id}`, requestData);
        setEditingVehicle(null);
      } else {
        await client.post('/trip', requestData);
      }
    
      clearForm();
      fetchVehicles();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('PUT request error:', error.response.data);
      }
    }
  };

  const handleEdit = (vehicle) => {
    setName(vehicle.name);
    setPrice(vehicle.price);
    setDriverAllowance(vehicle.driverAllowance);
    setOneWayTrip(vehicle.oneWayTrip);
    setRoundTrip(vehicle.roundTrip);
    setState(vehicle.state);
    setPermit(vehicle.permit);
    setTollGates(vehicle.tollGates);
    setEditingVehicle(vehicle);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this vehicle!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      });

      if (result.isConfirmed) {
        await client.delete(`/trip/${id}`);
        fetchVehicles();
        Swal.fire('Deleted!', 'Your vehicle has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your vehicle is safe :)', 'error');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const fetchVehicles = () => {
    client.get('/trip')
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));
  };

  const clearForm = () => {
    setName('');
    setPrice(0);
    setDriverAllowance(0);
    setOneWayTrip('');
    setRoundTrip('');
    setState('');
    setPermit('');
    setTollGates('');
    setFile(null);
    setEditingVehicle(null);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className='card'>
            <div className="col-md-12 mt-4">
              <h2>Trip Vehicles</h2>
              <form>
                <div className="row g-3">
                  <div className="col-md-6 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="col-md-6 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Driver Allowance"
                      value={driverAllowance}
                      onChange={(e) => setDriverAllowance(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="col-md-6 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="One Way Trip"
                      value={oneWayTrip}
                      onChange={(e) => setOneWayTrip(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Round Trip"
                      value={roundTrip}
                      onChange={(e) => setRoundTrip(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Permit"
                      value={permit}
                      onChange={(e) => setPermit(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Toll Gates"
                      value={tollGates}
                      onChange={(e) => setTollGates(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-md-12">
                    {editingVehicle ? (
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={handleFormSubmit}
                      >
                        Update Vehicle
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={handleFormSubmit}
                      >
                        Add Vehicle
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            <h3>Trip Vehicles</h3>
            <div className="row">
              {vehicles.map((vehicle) => (
                <div className="col-md-4" key={vehicle._id}>
                  <div className="card mb-3">
                    <img
                      src={vehicle.image}
                      className="card-img-top"
                      alt={vehicle.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{vehicle.name}</h5>
                      <p className="card-text">{vehicle.state}</p>
                      <p className="card-text">{vehicle.price}</p>
                      <p className="card-text">{vehicle.driverAllowance}</p>
                      <p className="card-text">{vehicle.oneWayTrip}</p>
                      <p className="card-text">{vehicle.roundTrip}</p>
                      <p className="card-text">{vehicle.permit}</p>
                      <button
                        className="btn btn-info"
                        style={{ backgroundColor: '#0D2259', margin: '10px' }}
                        onClick={() => handleDelete(vehicle._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEdit(vehicle)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
