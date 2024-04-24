import React, { useState, useEffect } from 'react';
import Loader from '../../components/customhooks/common/loader/Loader';
import Header from '../../components/customhooks/common/Header/Header';
import { client } from '../../components/clientaxios/Client'; // Import the Axios client
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


export default function Tour() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await client.get('/package'); // Assuming '/properties' is the endpoint for fetching properties
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Header />
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <span className="breadcrumb"><a href="#">Home</a> /Tour Packages</span>
                <h3>Tour Packages</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="section properties">
          <div className="container">
            {loading ? (
              <Loader />
            ) : (
              <div className="row properties-box">
                {properties.map((property, index) => (
                  <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6" key={index}>
                    <div className="item">
                      <a href="property-details.html"><img src={property.imageUrl} alt={property.name} /></a>
                      
                      <span className="category">
    {[...Array(property.stars)].map((_, index) => (
      <FontAwesomeIcon color='#FBBC23' icon={faStar} key={index} />
    ))}
  </span>                      <h6>${property.price}</h6>
                      <h4><a href="property-details.html">{property.address}</a></h4>
                      <ul>
                        <li>Description: <span>{property.description}</span></li>
                        {/* <li>Bathrooms: <span>{property.bathrooms}</span></li>
                        <li>Area: <span>{property.area}</span></li>
                        <li>Floor: <span>{property.floor}</span></li>
                        <li>Parking: <span>{property.parking}</span></li> */}
                      </ul>
                      <div className="main-button">
                        <a href="property-details.html">View Details</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <footer>
          <div className="container">
            <div className="col-lg-12">
              <p>Copyright © 2048 Villa Agency Co., Ltd. All rights reserved.
                Design: <a rel="nofollow" href="https://templatemo.com" target="_blank">TemplateMo</a> Distribution: <a href="https://themewagon.com">ThemeWagon</a></p>
            </div>
          </div>
        </footer>
        {/* Scripts */}
        {/* Bootstrap core JavaScript */}
      </div>
    </div>
  );
}
