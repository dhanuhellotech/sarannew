import React, { useState, useEffect } from 'react';
import { client } from '../../clientaxios/Clientaxios';
import Swal from 'sweetalert2';

export default function PackageDetail() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [numberOfPersons, setNumberOfPersons] = useState(0);
  const [includes, setIncludes] = useState('');
  const [includesExpanded, setIncludesExpanded] = useState(false);
  const [excludes, setExcludes] = useState('');
  const [excludesExpanded, setExcludesExpanded] = useState(false);
  const [services, setServices] = useState('');
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [days, setDays] = useState([]);
  const [file, setFile] = useState(null);
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [readArray, setReadArray] = useState();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
      const requestData = new FormData();
      requestData.append('name', name);
      requestData.append('description', description);
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
    setDescription('');
    setNumberOfDays(0);
    setNumberOfPersons(0);
    setIncludes('');
    setIncludesExpanded(false);
    setExcludes('');
    setExcludesExpanded(false);
    setServices('');
    setServicesExpanded(false);
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


  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await client.get('/packagedetail');
      setPackages(response.data);
      setReadArray(new Array(response.data.length).fill(false));
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };
  

  const toggleReadMore = (index) => {
    const updatedDays = [...days];
    updatedDays[index].expanded = !updatedDays[index].expanded;
    setDays(updatedDays);
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
    setDescription(pkg.description);
    setNumberOfDays(pkg.numberOfDays);
    setNumberOfPersons(pkg.numberOfPersons);
    setIncludes(pkg.includes);
    setIncludesExpanded(false);
    setExcludes(pkg.excludes);
    setExcludesExpanded(false);
    setServices(pkg.services);
    setServicesExpanded(false);
    setDays(pkg.days.map(day => ({ ...day, expanded: false })));
    setEditingPackage(pkg);
  };
  const toggleIncludes = () => {
    setIncludesExpanded(!includesExpanded);
  };
  
  // Function to toggle excludes text
  const toggleExcludes = () => {
    setExcludesExpanded(!excludesExpanded);
  };
  
  // Function to toggle services text
  const toggleServices = () => {
    setServicesExpanded(!servicesExpanded);
  };

  const handleRead = (index) => {
    setReadArray((prev) => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];
      return newArray;
    });
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
                  type="text"
                  className="form-control"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                {includes.length > 20 && (
                  <span className="read-more" onClick={() => toggleReadMore(includesExpanded, setIncludesExpanded)}>
                    {includesExpanded ? 'Read Less' : 'Read More'}
                  </span>
                )}
              </div>
              <div className="col-md-6 mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Excludes"
                  value={excludes}
                  onChange={(e) => setExcludes(e.target.value)}
                />
                {excludes.length > 20 && (
                  <span className="read-more" onClick={() => toggleReadMore(excludesExpanded, setExcludesExpanded)}>
                    {excludesExpanded ? 'Read Less' : 'Read More'}
                  </span>
                )}
              </div>
              <div className="col-md-6 mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Services"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                />
                {services.length > 20 && (
                  <span className="read-more" onClick={() => toggleReadMore(servicesExpanded, setServicesExpanded)}>
                    {servicesExpanded ? 'Read Less' : 'Read More'}
                  </span>
                )}
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
                {/* Other card details */}
                <p className="card-text">
                  Includes: {includesExpanded ? pkg.includes : `${pkg.includes.slice(0, 20)}...`}
                  {pkg.includes.length > 20 && (
                    <span className="read-more" onClick={toggleIncludes}>
                      {includesExpanded ? 'Read Less' : 'Read More'}
                    </span>
                  )}
                </p>
                <p className="card-text">
                  Excludes: {excludesExpanded ? pkg.excludes : `${pkg.excludes.slice(0, 20)}...`}
                  {pkg.excludes.length > 20 && (
                    <span className="read-more" onClick={toggleExcludes}>
                      {excludesExpanded ? 'Read Less' : 'Read More'}
                    </span>
                  )}
                </p>
                <p className="card-text">
                  Services: {servicesExpanded ? pkg.services : `${pkg.services.slice(0, 20)}...`}
                  {pkg.services.length > 20 && (
                    <span className="read-more" onClick={toggleServices}>
                      {servicesExpanded ? 'Read Less' : 'Read More'}
                    </span>
                  )}
                </p>
                {/* Mapping for days */}
                <ul>
                  {pkg.days.map((day, dayIndex) => (
                    <li key={dayIndex} style={{display: readArray[index] ? "block" : "none"}}>
                      Day {day.dayNumber}: {day.description}
                    </li>
                    
                  ))}
                                        <button style={{backgroundColor: '#0D2259', margin: '10px', color: 'white'}} onClick={() => handleRead(index)}>{readArray[index] ? 'Hide Description' : 'Show Description'}</button>

                </ul>
                {/* Buttons for delete and edit */}
              </div>
            </div>
          </div>
        ))}      </div>
    </div>
  );
}
