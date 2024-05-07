import React, { useState, useEffect } from "react";
import "./Popup.css"; // Import CSS file for custom styles
import axios from "axios";
import { client } from "../clientaxios/Client";
const Popup = () => {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    dateOfTravel: "",
    numberOfPersons: "",
    name: "",
    cityOfResidence: "",
    email: "",
    phoneNumber: "",
    destination: "",
    vacationType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personsRegex = /^[0-9]$/;
    if (!personsRegex.test(formData.numberOfPersons)) {
      alert("Please enter a valid number for No of persons");
      return;
    }
    
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      alert("Please enter a valid phone number (10 digits)");
      return;
    }
    
    try {

        await axios
          .post('http://localhost:5000/popup/submit_enquiry', formData)
          .then((res) => {
            console.log(res.data);
          });
      setSubmitted(true);
      sessionStorage.setItem('formSubmitted', 'true');
      // Close the modal after successful submission
      setShow(false);
  
      setFormData({
        dateOfTravel: "",
        numberOfPersons: "",
        name: "",
        cityOfResidence: "",
        email: "",
        phoneNumber: "",
        destination: "",
        vacationType: "",
      });
    } catch (error) {
      console.error("Error submitting enquiry form:", error);
    }
  };
  

  useEffect(() => {
    // Show the modal when the component mounts
    handleShow();
    setShow(true);

    if (sessionStorage.getItem('formSubmitted')) {
      setShow(false);
    }
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <div>
      {show && !submitted && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content" style={{ borderRadius: "30px" }}>
              <div
                className="modal-header"
                style={{ backgroundColor: "#FBBC23" }}
              >
                <h6 style={{ textAlign: "center" }}>Enquire Now!!</h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
   

              <div className="modal-body">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="mb-3">
                    <input
                      type="date"
                      className="form-control fw-bold"
                      id="persons"
                      name="dateOfTravel"
                      value={formData.dateOfTravel}
                      onChange={handleChange}
                      placeholder="Date of Travel"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control fw-bold"
                      id="persons"
                      name="numberOfPersons"
                      value={formData.numberOfPersons}
                      onChange={handleChange}
                      placeholder=" No of persons"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control fw-bold"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      name="name"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control fw-bold"
                      id="name"
                      name="cityOfResidence"
                      value={formData.cityOfResidence}
                      onChange={handleChange}
                      placeholder="City of residence"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control fw-bold"
                      id="name"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control fw-bold"
                      id="name"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      minLength="10"
                      maxLength="10"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control fw-bold"
                      id="persons"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Destination"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control fw-bold"
                      id="persons"
                      name="vacationType"
                      value={formData.vacationType}
                      onChange={handleChange}
                      placeholder="Vacation Type"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-sm px-5 btn-warning fw-bold h4"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {show && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default Popup;
