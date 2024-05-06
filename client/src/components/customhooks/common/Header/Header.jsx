import React, { useState, useEffect } from 'react';
import {Link,useLocation} from 'react-router-dom'
import './Header.css'
import { client } from '../../../clientaxios/Client';
import { useScript } from '../../Script.js'
import { useCss } from '../../css.js';
import logo from '../../../../assets/logo/Saran Tours & Travels Kumily Logo Rounded.png'

export default function Header() {
  const windowWidth = window.screen.width
  const [contactInfo, setContactInfo] = useState({});
  const [navstate, SetnavState] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // const closeNavonscroll = () => {
    //   if (window.scrollY > 20) {
    //     SetnavState(false);
    //   }
    // };
    // window.addEventListener('scroll', closeNavonscroll);
    window.addEventListener("resize",changeNavState)
  }, []);

  useEffect(() => {
    fetchTopbarData();
  }, []);

  const fetchTopbarData = () => {
    client
      .get('/topbar')
      .then((response) => {
        console.log("Topbar API Response:", response.data);
        if (response.data.length > 0) {
          const { number, location, mailid } = response.data[0];
          setContactInfo({ number, location, mailid });
        } else {
          setContactInfo({ number: 'N/A', location: 'N/A', mailid: 'N/A' });
        }
      })
      .catch((error) => {
        console.error('Error fetching topbar data:', error);
        setContactInfo({ number: 'N/A', location: 'N/A', mailid: 'N/A' });
      });
  };

  const changeNavState=()=>{
    if(windowWidth>700){
      SetnavState(true)
    }else{
      SetnavState(false)
    }
  }

  useEffect(()=>{
    changeNavState()
  },[windowWidth])
  
  // useScript('vendor/jquery/jquery.min.js')
  // useScript('vendor/bootstrap/js/bootstrap.min.js')
  // useScript('assets/js/isotope.min.js')
  // useScript('assets/js/owl-carousel.js')
  // useScript('assets/js/counter.js')
  // useScript('assets/js/custom.js')
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
                <li>
                <i className="fa fa-envelope" />
                  {contactInfo.mailid}
                </li>
              </ul>
        </div>
        <div className="col-lg-4 col-md-4">
          <ul className="social-links">
            <li><a href="#"><i className="fab fa-facebook" /></a></li>
            <li><a href="https://x.com/minthu" target="_blank"><i className="fab fa-twitter" /></a></li>
            {/* <li><a href="#"><i className="fab fa-linkedin" /></a></li> */}
            <li><a href="https://www.instagram.com/_sarantoursandtravelskumily_/?hl=en"><i className="fab fa-instagram" /></a></li>
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
          <nav className="main-nav" >
            {/* ***** Logo Start ***** */}
            <a href="/" className="logo">
            <Link to="/" className="  ">
            <img src={logo} className='logo' alt="Logo" />
          </Link>
            </a>
            {/* ***** Logo End ***** */}
            {/* ***** Menu Start ***** */}
            <ul className="nav" style={{display:navstate?"flex":"none"}}>
           <li><Link to='/'>Home</Link></li> 
             <li><Link to='/about'>About</Link></li>
             <li><Link to="/service">Services</Link></li>
             <li><Link to="/tour">Tour Packages</Link></li>
             <li><Link to="/contact">Contact</Link></li>
             <li><a href="#"><i class="fa fa-calendar"></i> Schedule a visit</a></li>
            </ul>   
            <a className="menu-trigger" onClick={() => SetnavState(!navstate)}>
              <span>Menu</span>
            </a>
            {/* ***** Menu End ***** */}
          </nav>
        </div>
      </div>
    </div>
  </header>
    </div>
  )
  
  function NavLink({ to, label }) {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`nav-item nav-link ${isActive ? 'active' : ''}`}>{label}</Link>
    );
  }
}

