import React,{useState,useEffect} from 'react'
import Loader from '../../components/customhooks/common/loader/Loader'
import Header from '../../components/customhooks/common/Header/Header'
import { client } from '../../components/clientaxios/Client';
import { useScript } from '../../components/customhooks/Script';

import axios from 'axios';

export default function Contact() {

  const [users, setUsers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    fetchUsers();
  }, []);
  const sendContactEmail = async (formData) => {
    try {
      // Send the email data to the backend endpoint
      const response = await client.post('/api/contact', formData);
      console.log('Email sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await client.get('/topcontact');
      console.log('Contact details response:', response.data);
      // Assuming response.data is an array with one object
      if (response.data.length > 0) {
        const { phoneNumber, email, address } = response.data[0];
        setContactDetails({ phoneNumber, email, address });
      }
    } catch (error) {
      console.error('Error fetching contact details:', error);
    }
  };
  
  const [contactDetails, setContactDetails] = useState({
    phoneNumber: '',
    email: '',
    address: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber:'',
    subject: '',
    message: '',
    category: 'General Inquiry' // Default category
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post('contacts', formData);
      alert('Form submitted successfully');
      setFormData({
        name: '',
        email: '',
        phoneNumber:'',
        subject: '',
        message: '',
        category: 'General Inquiry'
      });
      alert('Form submitted successfully');
      await sendContactEmail(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting the form. Please try again.');
    }
  };


  
  return (
    <div>
      <div>
        {/* <Loader/> */}


        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <span className="breadcrumb">
                  <a href="#">Home</a> / Contact Us
                </span>
                <h3>Contact Us</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-page section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="section-heading">
                  <h6 style={{ textAlign: "left" }}>| Contact Us</h6>
                  <h2 style={{ textAlign: "left" }}>Get In Touch </h2>
                </div>
                <p style={{ textAlign: "left" }}>
                  When planning your next adventure, remember Saran Tours and
                  Travel for all your travel needs. Discover unforgettable
                  destinations, book hassle-free accommodations, and embark on
                  unforgettable journeys with us. Share the excitement with your
                  friends and family, and thank you for choosing Saran Tours and
                  Travel for your travel experiences. Explore our website for a
                  diverse range of travel options and inspiration. If you need
                  further assistance or information, please don't hesitate to
                  contact us.
                </p>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-6">
                        <img
                          src="assets/images/icons/icons/phone-call.gif"
                          alt="Phone Icon"
                          style={{ maxWidth: 52 }}
                        />
                        <h6>{contactDetails.phoneNumber}</h6>
                        <br />
                        <span>Phone Number</span>
                      </div>
                      <div className="col-md-6">
                        <img
                          src="assets/images/icons/icons/email-file.gif"
                          alt="Email Icon"
                          style={{ maxWidth: 52 }}
                        />
                        <h6>{contactDetails.email}</h6>
                        <br />
                        <span>Business Email</span>
                      </div>
                    </div>

                    <hr></hr>
                  </div>

                  <div className="col-lg-12">
                    <img
                      src="assets/images/icons/icons/pin.gif"
                      alt="Address Icon"
                      style={{ maxWidth: 52 }}
                    />
                    <h6>{contactDetails.address}</h6>
                    <br />
                    <span>Business Address</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <form
                  id="contact-form"
                  action
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <fieldset>
                        <label htmlFor="name" className="fw-bold">
                          Full Name
                        </label>
                        <input
                          type="name"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name..."
                          autoComplete="on"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6">
                      <fieldset>
                        <label htmlFor="email" className="fw-bold">
                          Email Address
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          id="email"
                          pattern="[^ @]*@[^ @]*"
                          placeholder="Your E-mail..."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6">
                      <fieldset>
                        <label htmlFor="phoneNumber" className="fw-bold">
                          phoneNumber
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          id="phoneNumber"
                          placeholder="Your phone.."
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6">
                      <fieldset>
                        <label htmlFor="subject" className="fw-bold">
                          Subject
                        </label>
                        <input
                          type="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          name="subject"
                          id="subject"
                          placeholder="Subject..."
                          autoComplete="on"
                        />
                      </fieldset>
                    </div>
                    <label
                      htmlFor="vehicleModel"
                      style={{ marginBottom: "10px", display: "block" }}
                      className="fw-bold"
                    >
                      Category
                    </label>

                    <select
                      name="category"
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Booking">Booking</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="col-lg-12 mt-3">
                      <fieldset>
                        <label htmlFor="message" className="fw-bold">
                          Message
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={handleChange}
                          name="message"
                          id="message"
                          placeholder="Your Message"
                          defaultValue={""}
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="orange-button"
                        >
                          Send Message
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-12">
                <div id="map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.8728416476615!2d77.16592589999999!3d9.606216099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b065507b3880b97%3A0x4f1fd787c7ccba23!2sSaran%20Tours%20And%20Travels%20Kumily%20Thekkady!5e0!3m2!1sen!2sin!4v1712897734279!5m2!1sen!2sin"
                    width="100%"
                    height="500px"
                    frameBorder={0}
                    style={{
                      border: 0,
                      borderRadius: 10,
                      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
                    }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
