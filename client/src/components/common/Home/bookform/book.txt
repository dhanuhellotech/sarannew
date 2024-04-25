import React, { useState,useRef ,useEffect} from 'react';
import axios from 'axios'
export default function Booking() {
    const [activeTab, setActiveTab] = useState('Tour Packages');
    const formRef = useRef(null); // Reference to the form element
    const [vehicles, setVehicles] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]); 
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    useEffect(() => {
        fetchVehicleModels(); // Fetch vehicle models when component mounts
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        try {
            let endpoint;
            if (activeTab === 'Tour Packages') {
                endpoint = 'http://localhost:5000/tourform/submit'; // Update this URL with your actual endpoint
            } else if (activeTab === 'vehicle') {
                endpoint = 'http://localhost:5000/vecform/vehicles'; // Update this URL with your actual endpoint
            }
            
            const response = await axios.post(endpoint, data);
            console.log('Form submission response:', response.data);
            // Reset the form fields after successful submission
            formRef.current.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const fetchVehicleModels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/vecform/vehicle-models');
            setVehicleModels(response.data); // Set fetched vehicle models in state
        } catch (error) {
            console.error('Error fetching vehicle models:', error);
        }
    };
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
                <div className="col-lg-6 ">
                    <fieldset>
                        <label htmlFor="tourPackage "style={{ marginBottom: '10px', display: 'block' }}>Tour Package</label>
                        <select name="tourPackage" id="tourPackage" required  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            <option value="">----- Select Tour Package -----</option>
                            <option value="Cochin - Alleppey - Kovalam">Cochin - Alleppey - Kovalam</option>
                            <option value="Kodaikanal - Munnar - Ooty">Kodaikanal - Munnar - Ooty</option>
                            <option value="Munnar – Cochin - Alleppey">Munnar – Cochin - Alleppey</option>
                            <option value="Ooty – Mysore – Coorg">Ooty – Mysore – Coorg</option>
                            <option value="Ooty – Wayanad – Coorg">Ooty – Wayanad – Coorg</option>
                            
                            <option value="6">Kodaikanal – Munnar - Cochin</option><option value="7">Only Ooty Package</option><option value="8">Rameshwaram - Kanayakumari</option><option value="9">Madurai - Kodaikanal Package</option><option value="10">Madurai - Kanayakumari Package</option><option value="11">Madurai - Rameshwaram Package</option><option value="12">Madurai - Thiruchendur Package</option><option value="13">Madurai - Thiruchendur - Tirunelveli</option><option value="14">Thiruvannamalai - Kanchipuram - Vellore</option><option value="15">Pondicherry – Mamallapuram</option><option value="16">Pancha Sabhai Sthalam</option><option value="17">Pancha Guna Moorthi Sthalam</option><option value="18">Pancha Bootha Sathalangal</option><option value="19">Saptha Mangai Sthalam</option><option value="20">Lakshmi Narasimha Temple Tour</option><option value="21">Nava Tirupathi Temple Tour</option><option value="22">Nava Kailasam Temple Tour</option><option value="23">Madurai - Ahobilam</option> 
                            {/* Add more options as needed */}
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
