import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {Formik} from 'formik';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import axios from 'axios';
import { client,imageUrl } from '../clientaxios/Clientaxios';
import Skeleton from '@mui/material/Skeleton';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import './Login.css'; // Import your CSS file
import { Spinner } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    const img = new Image();
    img.src = "assets/images/caro/caronew.jpg";
    img.onload=() => {
      setLoaded(true);
    };
  }, []);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
 
  const handleLogin = () => {
    setLoading(true); // Start loading
    client
      .post('/api/login', { email, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('auth', true);
        onLogin();
        navigate('/');
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };
  
  console.log("Rendering Login component.");
  console.log("Login button clicked");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };
  const handleForgotPassword = async (values) => {
    try {
      // Check if the provided email matches the allowed email
      const validEmail = 'Shafichannel123@gmail.com';
      if (values.email === validEmail) {
        setLoading(true); // Set loading state to true
        const response = await client.post('/api/send-reset-email', { email: values.email });
        setLoading(false); // Reset loading state
        alert(response.data.message);
        handleClose();
      } else {
        alert('You are not authorized to perform this action.');
      }
    } catch (error) {
      setLoading(false); // Reset loading state
      console.error('Error sending reset password email:', error.message);
      alert('Failed to send reset password email. Please try again later.');
    }
  };

  return (
<div
  className="page-wrapper login-background"
  id="main-wrapper"
  data-layout="vertical"
  data-navbarbg="skin6"
  data-sidebartype="full"
  data-sidebar-position="fixed"
  data-header-position="fixed"
  style={{ backgroundImage: loaded ? 'url("assets/images/caro/caronew.jpg")' : 'none' }}
>
{!loaded && <Skeleton variant="rounded" width='100%' height='100vh' animation="wave" />}

  {/* Rest of your login component JSX */}

    
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                <h3 className='text-nowrap logo-img text-center d-block py-3 w-100 text-white'>Welcome Admin</h3>

                    <img src="assets/images/logo/Logo.png" width={140} alt="Logo" />
              
                  <h2 className="text-center mb-4 text-white">Login</h2>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3 position-relative">
      <label htmlFor="password" className="form-label">Password:</label>
      <input 
        type={showPassword ? "text" : "password"} 
        className="form-control" 
        id="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <span 
        className="position-absolute top-50 end-10 translate-middle-y eye-icon" 
        onClick={handleTogglePassword}
        style={{ cursor: 'pointer' }}
      >
        {showPassword ? (
    
          <Eye size={25} />
        ) : (
          <EyeSlash size={25} />
        )}
      </span>
    </div>
                  <button type="button" className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>


    <div className="card-body d-flex align-items-center justify-content-center">
 
  <div className="d-flex justify-content-start w-100">
    <a href="https://shafi.helloregister.in/" className="btn btn-primary px-3" style={{ backgroundColor: '#A879C2', borderColor: '#A879C2' }}>
      Home
    </a>
  </div>
  <a className="text-center text-white" style={{ cursor: 'pointer',fontWeight: 'bold' }} onClick={toggleModal}>
    Forgot Password?
  </a>
</div>



          <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader className="forgot" closeButton>
  <span className="close-button" onClick={toggleModal}>
    &times;
  </span>
  Forgot Password?
</ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Invalid email').required('Email is required')
                })}
                onSubmit={(values) => handleForgotPassword(values)}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>  
                    <FormGroup>
                      <Label for="forgot-email">Email Address</Label>
                      <Input
                        type="email"
                        name="email"
                        id="forgot-email"
                        placeholder="Enter your email address"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.email && !!errors.email}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </FormGroup>
                    <ModalFooter>
                      <Button color="secondary" onClick={toggleModal}>
                        Cancel
                      </Button>
                      <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner animation="border" variant="light" size="sm" /> : 'Send Reset Email'}
              </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </Modal>
 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
