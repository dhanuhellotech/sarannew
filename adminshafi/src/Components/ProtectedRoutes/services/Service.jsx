  import React, { useState, useEffect } from 'react';
  import { client } from '../../clientaxios/Clientaxios';
  import Swal from 'sweetalert2';

  export default function Services() {
    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState(0);
    const [description, setDescription] = useState('');
    const [briefDescription, setBriefDescription] = useState('');
    const [file, setFile] = useState(null);
    const [services, setServices] = useState([]);
    const [category, setCategory] = useState('');
    const [editingService, setEditingService] = useState(null);
    const MAX_DESCRIPTION_LENGTH = 200;
    const MAX_BRIEF_DESCRIPTION_LENGTH = 200;
    const [readArray, setReadArray] = useState([]);
    const [serId, setSerId] = useState("")

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
    const handleFormSubmit = async () => {
      try {
        if (!editingService) {
          // Check if all required fields are filled
          if (!serviceName || !servicePrice || !description || !briefDescription || !file || !category) {
            Swal.fire('Error', 'Please fill all the fields', 'error');
            return;
          }
        }
    
        // Check if description exceeds 200 words
        const descriptionWordCount = description.split(/\s+/).length;
        if (descriptionWordCount > MAX_DESCRIPTION_LENGTH) {
          Swal.fire({
            icon: 'warning',
            title: 'Description Limit Exceeded',
            text: 'The description should not exceed 200 words.',
          });
          return;
        }
    
        // Check if brief description exceeds 200 words
        const briefDescriptionWordCount = briefDescription.split(/\s+/).length;
        if (briefDescriptionWordCount > MAX_BRIEF_DESCRIPTION_LENGTH) {
          Swal.fire({
            icon: 'warning',
            title: 'Brief Description Limit Exceeded',
            text: 'The brief description should not exceed 200 words.',
          });
          return;
        }
    
        const requestData = new FormData();
        requestData.append('serviceName', serviceName);
        requestData.append('servicePrice', servicePrice);
        requestData.append('description', description);
        requestData.append('briefDescription', briefDescription);
        requestData.append('category', category);
        if (file) {
          requestData.append('image', file);
        }
    
        if (editingService) {
          console.log(serId)
          const serviceId = editingService.services[0]._id;
          await client.put(`/services/${editingService._id}/${serId}`, requestData); // Use editingService._id
          setEditingService(null);
        } else {
          await client.post('/services', requestData);
        }
    
        clearForm();
        fetchServices();
      } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response) {
          console.error('PUT request error:', error.response.data);
          Swal.fire('Error', error.response.data.message || 'Something went wrong', 'error');
        }
      }
    };
    
    const handleEdit = (service) => {
      setServiceName(service.services[0].serviceName);
      setServicePrice(service.services[0].servicePrice);
      setDescription(service.services[0].description);
      setBriefDescription(service.services[0].briefDescription);
      setCategory(service.category);
      setEditingService(service);
      setSerId(service.services[0]._id);
    };
    

    const handleDelete = async (id) => {
      try {
        // Display a confirmation dialog using SweetAlert
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this service!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        });
    
        // If the user confirms deletion
        if (result.isConfirmed) {
          // Send a DELETE request to delete the service with the provided ID
          await client.delete(`/services/${id}`);
          // Fetch the updated list of services
          fetchServices();
          // Show a success message using SweetAlert
          Swal.fire('Deleted!', 'Your service has been deleted.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // If the user cancels deletion, show a cancellation message using SweetAlert
          Swal.fire('Cancelled', 'Your service is safe :)', 'error');
        }
      } catch (error) {
        // Handle any errors that occur during deletion
        console.error('Error deleting service:', error);
      }
    };
    

    const fetchServices = () => {
      client.get('/services')
        .then(response => {
          setServices(response.data);
          const read = Array(response.data.length).fill(false);
          setReadArray(read);
        })
        .catch(error => console.error('Error fetching services:', error));
    };

    const clearForm = () => {
      setServiceName('');
      setServicePrice(0);
      setDescription('');
      setBriefDescription('');
      setFile(null);
      setEditingService(null);
    };

    // Function to truncate description to a certain number of words
    const truncateDescription = (desc, limit) => {
      if (desc) {
        const words = desc.split(' ');
        if (words.length > limit) {
          return words.slice(0, limit).join(' ') + '...';
        }
        return desc;
      } else {
        return '';
      }
    };
    
    const handleRead = (i) => {
      setReadArray(prev => ({
        ...prev,
        [i]: !readArray[i]
      }));
    };

    useEffect(() => {
      fetchServices();
    }, []);

    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className='card'>
              <div className="col-md-12 mt-4">
                <h2>Services</h2>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6 mt-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Service Name"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mt-4">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Service Price"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="col-md-6 mt-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mt-4">
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Brief Description"
                        value={briefDescription}
                        onChange={(e) => setBriefDescription(e.target.value)}
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
                    <div className="col-md-6   mt-4">
                      <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Category 1">Category 1</option>
                        <option value="Category 2">Category 2</option>
                        <option value="Category 3">Category 3</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      {editingService ? (
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          onClick={handleFormSubmit}
                        >
                          Update Service
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary mt-2"
                          onClick={handleFormSubmit}
                        >
                          Add Service
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <h3>Services</h3>
              <div className="row">
                {services.map((service, index) => (
                  <div className="col-md-4" key={service._id}>
                    <div className="card mb-3">
                      <h5 className="card-title">{service.services[0].serviceName}</h5>
                      <img
                        src={service.services[0].image}
                        className="card-img-top"
                        alt={service.services[0].serviceName}
                      />
                      <div className="card-body">
                        <p className="card-text">{service.category}</p>
                        <p className="card-text" style={{ display: readArray[index] ? 'block' : 'none' }}>
                          {service.services[0].description}
                        </p>
                        <button
                          style={{ backgroundColor: '#0D2259', margin: '10px', color: 'white' }}
                          onClick={() => handleRead(index)}
                        >
                          {readArray[index] ? 'Hide Description' : 'Show Description'}
                        </button>
                        <p className="card-text" style={{ display: readArray[index] ? 'block' : 'none' }}>
                          {service.services[0].briefDescription}
                        </p>
                        <button
                          style={{ backgroundColor: '#0D2259', margin: '10px', color: 'white' }}
                          onClick={() => handleRead(index)}
                        >
                          {readArray[index] ? 'Hide Brief Description' : 'Show Brief Description'}
                        </button>
                        <p className="card-text">Price: ${service.services[0].servicePrice}</p>
                      
                        <button
                          className="btn btn-outline-primary"
                          style={{ marginRight: '5px' }}
                          onClick={() => handleEdit(service)}
                        >
                          Edit
                        </button>
                        {/* Delete Button */}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(service._id)}
                        >
                          Delete
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
