import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../clientaxios/Clientaxios';
import Swal from 'sweetalert2';

export default function PackageDetail() {
  const [packageDetail, setPackageDetail] = useState(null);
  const [name, setName] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [numberOfPersons, setNumberOfPersons] = useState(0);
  const [includes, setIncludes] = useState('');
  const [excludes, setExcludes] = useState('');
  const [services, setServices] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [packages, setPackages] = useState([]);
  const [readArray, setReadArray] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [daysWithDescription, setDaysWithDescription] = useState([]);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleDayChange = (e, index) => {
    const updatedDays = [...daysWithDescription];
    updatedDays[index].dayNumber = parseInt(e.target.value);
    setDaysWithDescription(updatedDays);
  };

  const handleDescriptionChange = (e, index) => {
    const updatedDays = [...daysWithDescription];
    updatedDays[index].description = e.target.value;
    setDaysWithDescription(updatedDays);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const packageData = {
        name,
        numberOfDays,
        numberOfPersons,
        includes,
        excludes,
        services,
        imageUrl,
        days: daysWithDescription
      };
  
      if (editingPackage) {
        await client.put(`/packagedetail/${editingPackage._id}`, packageData);
        setEditingPackage(null);
      } else {
        await client.post('/packagedetail', packageData);
      }
  
      clearForm();
      fetchPackages();
      Swal.fire('Success', 'Package details saved successfully', 'success');
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire('Error', 'Failed to save package details', 'error');
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await client.get('/packagedetail');
      setPackages(response.data);
      const read = Array(response.data.length).fill(false);
      setReadArray(read);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setNumberOfDays(0);
    setNumberOfPersons(0);
    setIncludes('');
    setExcludes('');
    setServices('');
    setFile(null);
    setImageUrl('');
    setDaysWithDescription([]);
  };

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPackageDetail();
    }
    fetchPackages();
  }, [id]);

  useEffect(() => {
    if (packageDetail) {
      setName(packageDetail.name);
      setNumberOfDays(packageDetail.numberOfDays);
      setNumberOfPersons(packageDetail.numberOfPersons);
      setIncludes(packageDetail.includes || '');
      setExcludes(packageDetail.excludes || '');
      setServices(packageDetail.services || '');
      setImageUrl(packageDetail.imageUrl);
      setDaysWithDescription(packageDetail.days || []);
    }
  }, [packageDetail]);

  const handleRead = (index) => {
    setReadArray((prev) => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];
      return newArray;
    });
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
        fetchPackages();
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
    setIncludes(pkg.includes || '');
    setExcludes(pkg.excludes || '');
    setServices(pkg.services || '');
    setImageUrl(pkg.imageUrl);
    setEditingPackage(pkg);
    setDaysWithDescription(pkg.days || []);
  };

  const fetchPackageDetail = async () => {
    try {
      // Logic to fetch package detail
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };
  
  const addNewDay = () => {
    setDaysWithDescription(prevDays => [
      ...prevDays,
      { dayNumber: 0, description: '' }
    ]);
  };

  
  return (
    <div className="container">
      <div className='card'>
        <div className="col-md-12 mt-4">
          <h2>Package Details</h2>
          <form onSubmit={handleFormSubmit}>
  <div className="row g-3">
    <div className="col-md-6 mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </div>
  
    <div className="col-md-6 mt-4">
      <div className="mb-3">
        <label htmlFor="numberOfDays" className="form-label">Number of Days</label>
        <input type="number" className="form-control" id="numberOfDays" value={numberOfDays} onChange={(e) => setNumberOfDays(parseInt(e.target.value))} />
      </div>
    </div>
    <div className="col-md-6 mt-4">
      <div className="mb-3">
        <label htmlFor="numberOfPersons" className="form-label">Number of Persons</label>
        <input type="number" className="form-control" id="numberOfPersons" value={numberOfPersons} onChange={(e) => setNumberOfPersons(parseInt(e.target.value))} />
      </div>
    </div>
    <div className="col-md-6 mt-4">
      <div className="mb-3">
        <label htmlFor="includes" className="form-label">Includes</label>
        <textarea className="form-control" id="includes" rows="3" value={includes} onChange={(e) => setIncludes(e.target.value)}></textarea>
      </div>
    </div>
    <div className="col-md-6 mt-4">
      <div className="mb-3">
        <label htmlFor="excludes" className="form-label">Excludes</label>
        <textarea className="form-control" id="excludes" rows="3" value={excludes} onChange={(e) => setExcludes(e.target.value)}></textarea>
      </div>
    </div>
    <div className="col-md-6 mt-4">
      <div className="mb-3">
        <label htmlFor="services" className="form-label">Services</label>
        <textarea className="form-control" id="services" rows="3" value={services} onChange={(e) => setServices(e.target.value)}></textarea>
      </div>
    </div>
    {/* Fields for daysWithDescription */}
    {daysWithDescription.map((day, idx) => (
      <div key={idx} className="col-md-6 mt-4">
        <div className="mb-3">
          <label htmlFor={`day${idx}`} className="form-label">Day {idx + 1}</label>
          <input type="number" className="form-control" id={`day${idx}`} value={day.dayNumber} onChange={(e) => handleDayChange(e, idx)} />
        </div>
        <div className="mb-3">
          <label htmlFor={`description${idx}`} className="form-label">Description</label>
          <textarea className="form-control" id={`description${idx}`} rows="3" value={day.description} onChange={(e) => handleDescriptionChange(e, idx)}></textarea>
        </div>
      </div>
    ))}
    <div className="col-md-6 mt-4">
      <button type="button" className="btn btn-secondary" onClick={addNewDay}>Add Day</button>
    </div>
    <div className="col-md-6 mt-4">
      <div className="mb-3">
        <label htmlFor="file" className="form-label">Image</label>
        <input type="file" accept="image/*" className="form-control" id="file" onChange={handleFileChange} />
      </div>
    </div>
    <div className="col-md-12">
      <button type="submit" className="btn btn-primary">Save</button>
    </div>
  </div>
</form>

        </div>
      </div>

      <div className="col-md-12 mt-4">
        <h3>Packages</h3>
        <div className="row">
          {packages.map((pkg, index) => (
            <div className="col-md-4" key={pkg._id}>
              <div className="card mb-3">
                <img src={pkg.imageUrl} className="card-img-top" alt={pkg.name} />
                <div className="card-body">
                  <h5 className="card-title">{pkg.name}</h5>
                  <p className="card-text">{pkg.category}</p>
                  {pkg.daysWithDescription && pkg.daysWithDescription.map((dayDesc, idx) => (
                    <div key={idx}>
                      <p>Day {dayDesc.day}: {dayDesc.description}</p>
                    </div>
                  ))}
                  <p className="card-text" style={{ display: readArray[index] ? "block" : "none" }}>{pkg.description}</p>
                  <p className="card-text">Number of Days: {pkg.numberOfDays}</p>
                  <p className="card-text">Number of Persons: {pkg.numberOfPersons}</p>
                  <p className="card-text">Includes: {pkg.includes}</p>
                  <p className="card-text">Excludes: {pkg.excludes}</p>
                  <p className="card-text">Services: {pkg.services}</p>
                  <button style={{ backgroundColor: '#0D2259', margin: '10px', color: 'white' }} onClick={() => handleRead(index)}>
                    {readArray[index] ? 'Hide Description' : 'Show Description'}
                  </button>
                  <button className="btn btn-outline-primary" onClick={() => handleEdit(pkg)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(pkg._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
