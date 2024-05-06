// DetailService.js

import React, { useState, useEffect } from 'react';
import Header from '../../components/customhooks/common/Header/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { client } from '../../components/clientaxios/Client';
import './detail.css'
import { useCss } from '../../components/customhooks/css';
const DetailService = () => {

  useCss()
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const response = await client.get(`/services/${id}`);
      setService(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching service details:', error);
    }
  };

  return (
    <div>
   
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="intros">
          <div className="container">
            <div className="row serrow">
              <div className="col-lg-5">
                <div className="intros_content">
                  <div className="intros_title">{service.categoryName}</div>
                  <p className="intros_text">{service.briefDescription}</p>
                  <div className="price-section" style={{ marginBottom: '20px' }}>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <h2 className='fw-bold'>Price:{service.servicePrice}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="button intros_button">
                    <div className="button_bcg"></div>
<button className='btn btn-warning' >Explore Now</button>                </div>
                </div>
              </div>
              <div className="col-lg-7 d-flex align-items-center justify-content-end">
                <img src={service.image} alt="Service" className="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailService;