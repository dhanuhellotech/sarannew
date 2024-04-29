import React, { useState, useEffect } from 'react';
import Header from '../../components/customhooks/common/Header/Header';
import { client } from '../../components/clientaxios/Client';

export default function PackageDet() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get('/packagedetail');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="breadcrumb"><a href="#">Home</a> / Single Property</span>
              <h3>Single Property</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="section best-deal">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="section-heading">
                <h6>| Best Deal</h6>
                <h2>Find Your Best Deal Right Now!</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tabs-content">
                <div className="row">
                  <div className="nav-wrapper ">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="appartment-tab" data-bs-toggle="tab" data-bs-target="#appartment" type="button" role="tab" aria-controls="appartment" aria-selected="true">Appartment</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="villa-tab" data-bs-toggle="tab" data-bs-target="#villa" type="button" role="tab" aria-controls="villa" aria-selected="false">Villa House</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link" id="penthouse-tab" data-bs-toggle="tab" data-bs-target="#penthouse" type="button" role="tab" aria-controls="penthouse" aria-selected="false">Penthouse</button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="appartment" role="tabpanel" aria-labelledby="appartment-tab">
                      <div className="row">
                        {packages.map((pkg, index) => (
                            <>
                          <div className="col-lg-3" key={index}>
                            <div className="info-table">
                              <ul>
                                <li>Number of Days <span>{pkg.numberOfDays}</span></li>
                                <li>Number of Persons <span>{pkg.numberOfPersons}</span></li>
                                <li>Number of rooms <span>{pkg.numberOfRooms}</span></li>
                                <li>Parking Available <span>{pkg.parkingAvailable ? 'Yes' : 'No'}</span></li>
                                <li>Payment Process <span>{pkg.paymentProcess}</span></li>
                              </ul>
                            </div>
                         
                          
                          </div>
                            <div class="col-lg-6">
                            <img src={pkg.imageUrl} alt={pkg.name} />

                          </div>

                          <div className="col-lg-3">
                              <h4>{pkg.name}</h4>
                              <p>lorem</p>
                              <div className="icon-button">
                                <a href="#"><i className="fa fa-calendar" /> Schedule a visit</a>
                              </div>
                            </div>
                        </>
                        ))}
                      </div>
                    </div>
                    <div className="tab-pane fade" id="villa" role="tabpanel" aria-labelledby="villa-tab">
                      {/* Villa content goes here */}
                    </div>
                    <div className="tab-pane fade" id="penthouse" role="tabpanel" aria-labelledby="penthouse-tab">
                      {/* Penthouse content goes here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
