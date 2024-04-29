import React, { useState,useEffect } from 'react';
import { client } from '../../clientaxios/Clientaxios';
import Swal from 'sweetalert2';

export default function PackageDetail() {
  const [name, setName] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [numberOfPersons, setNumberOfPersons] = useState(0);
  const [includes, setIncludes] = useState('');
  const [excludes, setExcludes] = useState('');
  const [services, setServices] = useState('');
  const [days, setDays] = useState([]);
  const [file, setFile] = useState(null);
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleFormSubmit = async () => {
    try {
      const requestData = new FormData();
      requestData.append('name', name);
      requestData.append('numberOfDays', numberOfDays);
      requestData.append('numberOfPersons', numberOfPersons);
      requestData.append('includes', includes);
      requestData.append('excludes', excludes);
      requestData.append('services', services);
      requestData.append('image', file);

      days.forEach((day, index) => {
        requestData.append(`days[${index}][dayNumber]`, day.dayNumber);
        requestData.append(`days[${index}][description]`, day.description);
      });

      let response;
      if (editingPackage) {
        response = await client.put(`/packagedetail/${editingPackage._id}`, requestData);
      } else {
        response = await client.post('/packagedetail', requestData);
      }

      if (response.status === 201 || response.status === 200) {
        clearForm();
        fetchPackages();
        Swal.fire('Success', 'Package detail saved successfully', 'success');
      } else {
        Swal.fire('Error', 'Failed to save package detail', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('Request error:', error.response.data);
      }
    }
  };
  const clearForm = () => {
    setName('');
    setNumberOfDays(0);
    setNumberOfPersons(0);
    setIncludes('');
    setExcludes('');
    setServices('');
    setDays([]);
    setFile(null);
  };

  const handleAddDay = () => {
    setDays([...days, { dayNumber: days.length + 1, description: '' }]);
  };

  const handleDayChange = (index, field, value) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
  };
;
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await client.get('/packagedetail');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };
  fetchData();
}, []);
const fetchPackages = async () => {
  try {
    const response = await client.get('/packagedetail');
    setPackages(response.data);
  } catch (error) {
    console.error('Error fetching packages:', error);
  }
};

const handleDelete = async (id) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this package!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      await client.delete(`/packagedetail/${id}`);
      const updatedPackages = packages.filter(pkg => pkg._id !== id);
      setPackages(updatedPackages);
      Swal.fire('Deleted!', 'Your package has been deleted.', 'success');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Your package is safe :)', 'error');
    }
  } catch (error) {
    console.error('Error deleting package:', error);
  }
};

const handleEdit = (pkg) => {
  setName(pkg.name);
  setNumberOfDays(pkg.numberOfDays);
  setNumberOfPersons(pkg.numberOfPersons);
  setIncludes(pkg.includes);
  setExcludes(pkg.excludes);
  setServices(pkg.services);
  setDays(pkg.days);
  setEditingPackage(pkg);
};
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-4">
          <h2>Create Package Detail</h2>
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
                  placeholder="Number of Days"
                  value={numberOfDays}
                  onChange={(e) => setNumberOfDays(parseInt(e.target.value))}
                />
              </div>
              <div className="col-md-6 mt-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Number of Persons"
                  value={numberOfPersons}
                  onChange={(e) => setNumberOfPersons(parseInt(e.target.value))}
                />
              </div>
              <div className="col-md-6 mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Includes"
                  value={includes}
                  onChange={(e) => setIncludes(e.target.value)}
                />
              </div>
              <div className="col-md-6 mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Excludes"
                  value={excludes}
                  onChange={(e) => setExcludes(e.target.value)}
                />
              </div>
              <div className="col-md-6 mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Services"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
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
              {days.map((day, index) => (
                <div key={index}>
                  <div className="col-md-12 mt-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Day ${day.dayNumber} Description`}
                      value={day.description}
                      onChange={(e) => handleDayChange(index, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <div className="col-md-12 mt-4">
                <button type="button" className="btn btn-primary" onClick={handleAddDay}>Add Day</button>
              </div>
              <div className="col-md-12 mt-4">
  {editingPackage ? (
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleFormSubmit}
    >
      Update Package
    </button>
  ) : (
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleFormSubmit}
    >
      Create Package Detail
    </button>
  )}
</div>

            </div>
          </form>
        </div>
      </div>
      <div className="row">
  {packages.map((pkg, index) => (
    <div className="col-md-4" key={index}>
      <div className="card mb-3">
        <img src={pkg.imageUrl} className="card-img-top" alt={pkg.name} />
        <div className="card-body">
          <h5 className="card-title">{pkg.name}</h5>
          <p className="card-text">Category: {pkg.category}</p>
          <p className="card-text">Number of Days: {pkg.numberOfDays}</p>
          <p className="card-text">Number of Persons: {pkg.numberOfPersons}</p>
          <p className="card-text">Includes: {pkg.includes}</p>
          <p className="card-text">Excludes: {pkg.excludes}</p>
          <p className="card-text">Services: {pkg.services}</p>
          {/* Mapping for days */}
          <ul>
            {pkg.days.map((day, dayIndex) => (
              <li key={dayIndex}>
                Day {day.dayNumber}: {day.description}
              </li>
            ))}
          </ul>
          <button className="btn btn-danger" onClick={() => handleDelete(pkg._id)}>Delete</button>
          <button className="btn btn-primary" onClick={() => handleEdit(pkg)}>Edit</button>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
