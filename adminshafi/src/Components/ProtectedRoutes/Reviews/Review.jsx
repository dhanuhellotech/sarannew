import React, { useState, useEffect } from 'react';
import { client } from '../../clientaxios/Clientaxios';
import Swal from 'sweetalert2';

export default function Reviews() {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [stars, setStars] = useState(0);
  const [file, setFile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFormSubmit = async () => {
    try {
      // Check if editingReview is null (indicating a new review) and if any field is empty
      if (!editingReview && (!content || !name || !place || !stars || !file)) {
        Swal.fire('Error', 'Please fill all the fields', 'error');
        return;
      }
  
      // Check if content exceeds 200 words only for new reviews
      if (!editingReview) {
        const wordCount = content.split(/\s+/).length;
        if (wordCount > 200) {
          Swal.fire({
            icon: 'warning',
            title: 'Content Limit Exceeded',
            text: 'The content should not exceed 200 words.',
          });
          return;
        }
      }
  
      const requestData = new FormData();
      requestData.append('content', content);
      requestData.append('name', name);
      requestData.append('place', place);
      requestData.append('stars', stars);
      if (file) {
        requestData.append('image', file);
      }
  
      if (editingReview) {
        await client.put(`/review/${editingReview._id}`, requestData);
        setEditingReview(null);
      } else {
        await client.post('/review', requestData);
      }
  
      clearForm();
      fetchReviews();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('PUT request error:', error.response.data);
      }
    }
  };
  
  

  const handleEdit = (review) => {
    setContent(review.content);
    setName(review.name);
    setPlace(review.place);
    setStars(review.stars);
    setEditingReview(review);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this review!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      });

      if (result.isConfirmed) {
        await client.delete(`/review/${id}`);
        fetchReviews();
        Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your review is safe :)', 'error');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await client.get('/review');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const clearForm = () => {
    setContent('');
    setName('');
    setPlace('');
    setStars(0);
    setFile(null);
    setEditingReview(null);
  };

  // Function to truncate content to a certain number of words
  const truncateContent = (content, limit) => {
    const words = content.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return content;
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container">
        
        <div className="row">
          {/* Form section */}
          <div className='card'>
          <div className="col-md-12 mt-4">
            <h2> Reviews</h2>
            <form>
              {/* Form inputs */}
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
                    placeholder="Place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-4">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-md-12">
                  {/* Submit button */}
                  {editingReview ? (
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={handleFormSubmit}
                    >
                      Update Review
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={handleFormSubmit}
                    >
                      Add Review
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
          </div>
          {/* Display reviews */}
          <div className="col-md-12 mt-4">
            <h3>Reviews</h3>
            <div className="row">
              {reviews.map(review => (
                <div className="col-md-4" key={review._id}>
                  <div className="card mb-3">
                    <img
                      src={review.image}
                      className="card-img-top"
                      alt={review.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{review.name}</h5>
                      <p className="card-text">{truncateContent(review.content, 20)}</p>
                      <p className="card-text">{review.stars} Stars</p>
                      <button
                        className="btn btn-info"
                        style={{ backgroundColor: '#6f42c1', margin: '10px' }}
                        onClick={() => handleDelete(review._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEdit(review)}
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
