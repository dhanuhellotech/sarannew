import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { client } from '../../clientaxios/Clientaxios';
import './treatment.css'

export default function Treatments() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [editingTreatmentId, setEditingTreatmentId] = useState(null);
  const [readArray, setReadArray] = useState()
  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = () => {
    client.get('/treatments')
      .then(response => {
        setTreatments(response.data)
        const read = Array(response.data.length).fill(false)
        setReadArray(read)
      })
      .catch(error => console.error('Error fetching treatments:', error));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleFormSubmit = async () => {
    try {
      // Check if editingTreatmentId is null (indicating a new treatment) and if any field is empty
      if (!editingTreatmentId && (!title || !description || !briefDescription || !imageFile)) {
        Swal.fire('Error', 'Please fill all the fields', 'error');
        return;
      }
  
      // Check if the description exceeds 200 characters only for new treatments
      if (!editingTreatmentId && description.length > 200) {
        // Show an error message and prevent form submission
        Swal.fire('Error', 'Description cannot exceed 200 characters.', 'error');
        return;
      }
  
      // Check if the briefDescription exceeds 200 characters only for new treatments
      if (!editingTreatmentId && briefDescription.length > 200) {
        // Show an error message and prevent form submission
        Swal.fire('Error', 'Brief description cannot exceed 200 characters.', 'error');
        return;
      }
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('briefDescription', briefDescription);
      formData.append('image', imageFile);
  
      if (editingTreatmentId) {
        await client.put(`/treatments/${editingTreatmentId}`, formData);
        setEditingTreatmentId(null);
      } else {
        // Check if this is a new treatment (not being edited)
        const isNewTreatment = treatments.every(treatment => treatment.title !== title);
        if (!isNewTreatment) {
          // Treatment with this title already exists, show an error message
          Swal.fire('Error', 'Title must be unique', 'error');
          return;
        }
  
        // Add the new treatment
        await client.post('/treatments/resize', formData);
      }
  
      // Clear form fields and fetch treatments
      clearForm();
      fetchTreatments();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
  
  
  const handleEditTreatment = (treatmentId) => {
    const treatmentToEdit = treatments.find(treatment => treatment._id === treatmentId);
    if (treatmentToEdit) {
      setTitle(treatmentToEdit.title);
      setDescription(treatmentToEdit.description);
      setBriefDescription(treatmentToEdit.briefDescription);
      setEditingTreatmentId(treatmentToEdit._id);
    }
  };

  const handleDeleteTreatment = async (treatmentId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this treatment!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      });
  
      if (result.isConfirmed) {
        await client.delete(`/treatments/${treatmentId}`);
        fetchTreatments();
        Swal.fire('Deleted!', 'Your treatment has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your treatment is safe :)', 'error');
      }
    } catch (error) {
      console.error('Error deleting treatment:', error);
    }
  };
  

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setBriefDescription('');
    setImageFile(null);
    setEditingTreatmentId(null);
  };

  const handleRead=(i)=>{
    setReadArray((prev)=>({
      ...prev,
      [i]:!readArray[i]
    }))
  }
  return (
    <div>
      {/* Header Start */}
      {/* Header End */}
      <div className="container-fluid">
        <div className="container">
          <div className="card" style={{ padding: '20px', margin: '20px 0' }}>
            <h4 className="card-title">Treatment</h4>
            <form method="post" action="/your-upload-endpoint" encType="multipart/form-data">
              <div className="row">
                <div className="col-md-6">
                  <label>Title</label>
                  <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="col-md-6 ">
                <label>Image</label>
                  <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
                </div>
                <div className="col-md-12 mt-3">
                  <label>Description</label>
                  <textarea type="text" className="form-control" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="col-md-12 mt-3">
                  <label>Brief Description</label>
                  <textarea type="text" className="form-control" rows={4} value={briefDescription} onChange={(e) => setBriefDescription(e.target.value)} />
                </div>
                
                <div className="col-md-12 mt-3">
                  <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>{editingTreatmentId ? 'Update Treatment' : 'Add Treatment'}</button>
                </div>
              </div>
            </form>
          </div>
          {/* Display existing treatments */}
          <h5 style={{ marginTop: '20px' }}>Existing Treatments</h5>
          <div className="row">
            {treatments.map((treatment,index) => (
              <div className="col-md-6 col-lg-6" key={treatment._id}>
                <div className="card mb-3">
                  <div className="card-body ">
                    <h5 className="card-title "  >Title: {treatment.title}</h5>
                    <p className="card-text text-center" >Description: {treatment.description}</p>
                    <p className="card-text" style={{display:readArray[index]?"block":"none"}}>Brief Description: {treatment.briefDescription}</p>
                    <button style={{ backgroundColor: '#6f42c1',margin:'10px',color:'white' }} onClick={()=>handleRead(index)}>{readArray[index]?'Hide description':'Show description'}</button>

                    <img src={treatment.image} alt={treatment.title} className="card-img-top" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
                    <div>
                      <button className="btn btn-info  me-2"         style={{ backgroundColor: '#6f42c1',margin:'10px' }} onClick={() => handleDeleteTreatment(treatment._id)}>Delete</button>
                      <button className="btn btn-primary" onClick={() => handleEditTreatment(treatment._id)}>Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
