import React, { useState,useRef ,useEffect} from 'react';
import {client} from '../../../../clientaxios/Client'

import axios from 'axios'
export default function Booking() {
    const [activeTab, setActiveTab] = useState('Tour Packages');
    const formRef = useRef(null);
    const [vehicles, setVehicles] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]);
    const [tourPackages, setTourPackages] = useState([]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        fetchVehicleModels();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
    
        try {
            let endpoint;
            if (activeTab === 'Tour Packages') {
                endpoint = '/tourform/submit'; // Concatenate with baseURL
            } else if (activeTab === 'vehicle') {
                endpoint = '/vecform/vehicles'; // Concatenate with baseURL
            }
            console.log('Endpoint:', endpoint); // Log the endpoint URL
            const response = await client.post(endpoint, data);
            console.log('Form submission response:', response.data);
            formRef.current.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    const fetchVehicleModels = async () => {
        try {
            const response = await client.get('vecform/vehicle-models');
            setVehicleModels(response.data);
        } catch (error) {
            console.error('Error fetching vehicle models:', error);
        }
    };
    const fetchTourPackages= async () => {
        try {
            const response = await client.get('/tourform');
            setTourPackages(response.data);
        } catch (error) {
            console.error('Error fetching tour package models:', error);
        }
    };
    useEffect(() => {
        fetchTourPackages();
    }, []);

    return (
        <div>
            <div className="contact section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="section-heading text-center">
                                <h6>| Book Now</h6>
                                <h2>Book Your Trip With Our Agents</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-content">
                <div className="container">
                <ul className="nav nav-tabs mr-3 p-2 d-flex justify-content-around" role="tablist">
    <li className="nav-item" role="presentation">
        <button
            className={`nav-link ${activeTab === 'Tour Packages' ? 'active' : ''}`}
            onClick={() => handleTabClick('Tour Packages')}
            type="button"
            style={{
                backgroundColor: activeTab === 'Tour Packages' ?  '#0D2259' : '#FBBC23',
                color: activeTab === 'Tour Packages' ? 'white' : 'white'
            }}
        >
            Tour Packages
        </button>
    </li>
    <li className="nav-item" role="presentation">
        <button
            className={`nav-link ${activeTab === 'vehicle' ? 'active' : ''}`}
            onClick={() => handleTabClick('vehicle')}
            type="button"
            style={{
                backgroundColor: activeTab === 'vehicle' ? '#0D2259' : '#FBBC23',
                color: activeTab === 'vehicle' ? 'white' : 'white'
            }}
        >
            Vehicles
        </button>
    </li>
</ul>

                    <div className="row">
                    {activeTab === 'Tour Packages' && (
    <div className="col-lg-12">
        <form id="contact-form" ref={formRef}  method="post" onSubmit={handleSubmit} action="">
            <div className="row">
                <div className="col-lg-6">
                    <fieldset>
                        <label htmlFor="guestName">Guest Name</label>
                        <input type="text" name="guestName" id="guestName" placeholder="Your Name..." autoComplete="on" required />
                    </fieldset>
                </div>
                <div className="col-lg-6">
                    <fieldset>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..." required />
                    </fieldset>
                </div>
                <div className="col-lg-6">
                    <fieldset>
                        <label htmlFor=" phoneNumber">Phone Number</label>
                        <input type="tel" name="phoneNumber" id="phoneNumber" placeholder="Your Phone Number..." required />
                    </fieldset>
                </div>
                <div className="col-lg-6">
    <fieldset>
        <label htmlFor="tourPackage" style={{ marginBottom: '10px', display: 'block' }}>Tour Package</label>
        <select name="tourPackage" id="tourPackage" required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
            <option value="">----- Select Tour Package -----</option>
            {tourPackages.map((tourPackage, index) => (
    <option key={index} value={tourPackage.tourPackagename}>{tourPackage.tourPackagename}</option>
))}


        </select>
    </fieldset>
</div>

                <div className="col-lg-12">
                    <fieldset>
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" placeholder="Your Message" defaultValue={""} />
                    </fieldset>
                </div>
                <div className="col-lg-12">
                    <fieldset>
                        <button type="submit" id="form-submit" className="orange-button">Send Message</button>
                    </fieldset>
                </div>
            </div>
        </form>
    </div>
)}

                    {activeTab === 'vehicle' && (
    <div className="col-lg-12">
        <form id="contact-form" action method="post" ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-lg-6">
                    <fieldset>
                        <label htmlFor="guestName" >Guest Name</label>
                        <input type="text" name="guestName" id="guestName" placeholder="Your Name..." autoComplete="on" required />
                    </fieldset>
                </div>
                <div className="col-lg-6">
                    <fieldset>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..." required />
                    </fieldset>
                </div>
                <div className="col-lg-6">
                    <fieldset>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="tel" name="phoneNumber" id="phoneNumber" placeholder="Your Phone Number..." required />
                    </fieldset>
                </div>
                <div className="col-lg-6">
                <fieldset>
                                                <label htmlFor="vehicleModel"style={{ marginBottom: '10px', display: 'block' }}>Vehicle Model</label>
                                                <select name="vehicleModel" id="vehicleModel" required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                                                    <option value="">Select Vehicle Model</option>
                                                    {vehicleModels.map(vehicle => (
                                                        <option key={vehicle._id} value={vehicle.modelName}>{vehicle.modelName}</option>
                                                    ))}
                                                </select>
                                            </fieldset>
                </div>
                <div className="col-lg-6">
                    <fieldset>
                        <label htmlFor="pickUpDate">Pick-up Date</label>
                        <input type="date" name="pickUpDate" id="pickUpDate" required />
                    </fieldset>
                </div>
                <div className="col-lg-6">
                    <fieldset>
                        <label htmlFor="address">Pick-up Place</label>
                        <input type="text" name="address" id="address" required />
                    </fieldset>
                </div>
                <div className="col-lg-12">
                    <fieldset>
                        <button type="submit" id="form-submit" className="orange-button">Send Message</button>
                    </fieldset>
                </div>
            </div>
        </form>
    </div>
)}

                    </div>
                </div>
            </div>
        </div>
    );
}
