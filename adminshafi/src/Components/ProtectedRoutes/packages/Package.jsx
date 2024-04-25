import React, { useState, useEffect } from 'react';
import { client } from '../../clientaxios/Clientaxios';
import Swal from 'sweetalert2';

export default function Packages() {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [file, setFile] = useState(null);
  const [packages, setPackages] = useState([]);
  const [category, setCategory] = useState('');
  const [editingPackage, setEditingPackage] = useState(null);
  const MAX_DESCRIPTION_LENGTH = 200;
  const MAX_BRIEF_DESCRIPTION_LENGTH = 200;
  const [readArray, setReadArray] = useState()
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFormSubmit = async () => {
    try {
      if (!editingPackage) {
        // Check if all required fields are filled
        if (!name || !stars || !price || !description || !briefDescription || !file) {
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
      requestData.append('name', name);
      requestData.append('stars', stars);
      requestData.append('price', price);
      requestData.append('description', description);
      requestData.append('briefDescription', briefDescription);
      requestData.append('category', category);
      if (file) {
        requestData.append('image', file);
      }
    
      if (editingPackage) {
        await client.put(`/package/${editingPackage._id}`, requestData);
        setEditingPackage(null);
      } else {
        await client.post('/package', requestData);
      }
    
      clearForm();
      fetchPackages();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('PUT request error:', error.response.data);
      }
    }
  };
  
  

  const handleEdit = (pkg) => {
    setName(pkg.name);
    setStars(pkg.stars);
    setPrice(pkg.price);
    setDescription(pkg.description);
    setBriefDescription(pkg.briefDescription);
    setCategory(pkg.category);
    setEditingPackage(pkg);
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
        await client.delete(`/package/${id}`);
        fetchPackages();
        Swal.fire('Deleted!', 'Your package has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your package is safe :)', 'error');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

//   const fetchPackages = async () => {
//     try {
//       client.get('/package');
//       setPackages(response.data);
//     } catch (error) {
//       console.error('Error fetching packages:', error);
//     }
//   };
  const fetchPackages = () => {
    client.get('/package')
      .then(response => {
        setPackages(response.data)
        const read = Array(response.data.length).fill(false)
        setReadArray(read)
      })
      .catch(error => console.error('Error fetching courses:', error));
  };

  const clearForm = () => {
    setName('');
    setStars(0);
    setPrice(0);
    setDescription('');
    setBriefDescription('');
    setFile(null);
    setEditingPackage(null);
  };

  // Function to truncate description to a certain number of words
  const truncateDescription = (desc, limit) => {
    const words = desc.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return desc;
  };
  const handleRead=(i)=>{
    setReadArray((prev)=>({
      ...prev,
      [i]:!readArray[i]
    }))
  }
  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className='card'>
            <div className="col-md-12 mt-4">
              <h2>Packages</h2>
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
                      placeholder="Stars"
                      value={stars}
                      onChange={(e) => setStars(parseInt(e.target.value))}
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
                      <option value="North Indian">North Indian</option>
                      <option value="South Indian">South Indian</option>
                      <option value="Group Tours">Group Tours</option>
                      <option value="Honeymoon Tours">Honeymoon Tours</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    {editingPackage ? (
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={handleFormSubmit}
                      >
                        Update Package
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={handleFormSubmit}
                      >
                        Add Package
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            <h3>Packages</h3>
            <div className="row">
              {packages.map((pkg,index) => (
                <div className="col-md-4" key={pkg._id}>
                  <div className="card mb-3">
                    <img
                      src={pkg.imageUrl}
                      className="card-img-top"
                      alt={pkg.name}
                    />
             
                    <div className="card-body">
                      <h5 className="card-title">{pkg.name}</h5>
                      <p className="card-text">{pkg.category}</p>
                      <p className="card-text" style={{display:readArray[index]?"block":"none"}}>{truncateDescription(pkg.description, 20)}</p>
                      <button  style={{ backgroundColor: '#0D2259',margin:'10px',color:'white' }} onClick={()=>handleRead(index)}>{readArray[index]?'Hide Description':'Show description'}</button>

                      <p className="card-text" style={{display:readArray[index]?"block":"none"}}>{pkg.briefDescription}</p>
                      <button  style={{ backgroundColor: '#0D2259',margin:'10px',color:'white' }} onClick={()=>handleRead(index)}>{readArray[index]?'Hide Brief  Description':'Show Brief description'}</button>

                      <p className="card-text">{pkg.stars} Stars</p>
                    
                      <p className="card-text">${pkg.price}</p>
                      <button
                        className="btn btn-info"
                        style={{ backgroundColor: '#0D2259', margin: '10px' }}
                        onClick={() => handleDelete(pkg._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEdit(pkg)}
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