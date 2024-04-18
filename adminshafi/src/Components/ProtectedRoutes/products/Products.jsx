import React, { useState, useEffect } from 'react';
import { client } from '../../clientaxios/Clientaxios';
import Swal from 'sweetalert2';

export default function Products() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
      const requestData = new FormData();
      requestData.append('title', title);
      requestData.append('description', description);
      if (file) {
        requestData.append('image', file);
      }
  
      // Check if it's a new product (not editing an existing one)
      if (!editingProduct) {
        // Perform validation only for new products
        if (!title || !description || !file) {
          Swal.fire('Error', 'Kindly fill all fields', 'error');
          return;
        }
      }
  
      if (editingProduct) {
        await client.put(`/products/${editingProduct._id}`, requestData);
        setEditingProduct(null);
      } else {
        await client.post('/products', requestData);
      }
  
      clearForm();
      fetchProducts();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('PUT request error:', error.response.data);
      }
    }
  };
  
  
  const handleEdit = (product) => {
    setTitle(product.title);
    setDescription(product.description);
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this product!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      });

      if (result.isConfirmed) {
        await client.delete(`/products/${id}`);
        fetchProducts();
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your product is safe :)', 'error');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await client.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setEditingProduct(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className='card'>
          <div className="col-md-12 mt-4">
    
            <h2> Products</h2>
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) setDescription(e.target.value);
                    }}
                  />
                  <small className="text-muted">{description.length}/200</small>
                </div>
               
                <div className="col-md-12">
                  {editingProduct ? (
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={handleFormSubmit}
                    >
                      Update Product
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={handleFormSubmit}
                    >
                      Add Product
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
          </div>  
          <div className="col-md-12 mt-4">
            <h3>Products</h3>
            <div className="row">
              {products.map(product => (
                <div className="col-md-4" key={product._id}>
                  <div className="card mb-3">
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      alt={product.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <button
                        className="btn btn-info"
                        style={{ backgroundColor: '#6f42c1', margin: '10px' }}
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEdit(product)}
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
