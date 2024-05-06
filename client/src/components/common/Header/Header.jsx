import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../clientaxios/Client'; // Assuming this is the correct import for your client axios instance

export default function Header() {
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    fetchTopbarData();
  }, []);

  const fetchTopbarData = () => {
    client
      .get('/topbar') // Make sure this endpoint is correct
      .then((response) => {
        console.log("Topbar API Response:", response.data); // Log the response data
        const { number, location } = response.data;
        setContactInfo({ number, location });
      })
      .catch((error) => {
        console.error('Error fetching topbar data:', error);
        // Optionally, set a default or empty state for contactInfo
        setContactInfo({ number: 'N/A', location: 'N/A' });
      });
  };

  return (
    <div>
      <div className="sub-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <ul className="info">
                <li>
                  <i className="fa fa-envelope" />
                  {contactInfo.number}
                </li>
                <li>
                  <i className="fa fa-map" />
                  {contactInfo.location}
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <ul className="social-links">
                <li><a href="#"><i className="fab fa-facebook" /></a></li>
                <li><a href="https://x.com/minthu" target="_blank"><i className="fab fa-twitter" /></a></li>
                <li><a href="#"><i className="fab fa-linkedin" /></a></li>
                <li><a href="#"><i className="fab fa-instagram" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* ***** Header Area Start ***** */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <Link to="/" className="">
            <img src="assets/images/logo/logo.jpg" className='logo' alt="Logo" />
          </Link>
                
                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
                <ul className="nav">
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/about'>About</Link></li>
                  <li><Link to="/service">Services</Link></li>
                  <li><Link to="/tour">Tour Packages</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><a href="#"><i className="fa fa-calendar"></i> Schedule a visit</a></li>
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
