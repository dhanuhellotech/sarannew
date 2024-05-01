import React from 'react'
import {Link} from 'react-router-dom'
import { useScript } from '../../customhooks/Script'
export default function Header() {
  
  useScript('vendor/jquery/jquery.min.js')
  useScript('vendor/bootstrap/js/bootstrap.min.js')
  useScript('assets/js/isotope.min.js')
  useScript('assets/js/owl-carousel.js')
  useScript('assets/js/counter.js')
  useScript('assets/js/custom.js')
  return (
    <div>
        <div className="sub-header">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-8">
          <ul className="info">
            <li><i className="fa fa-envelope" />09562952223</li>
            <li><i className="fa fa-map" /> Chempenkulam Building Thekkady, Junction, Kottayam - Kumily Rd, Kumily, Kerala 685509</li>
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
            <a href="index.html" className="logo">
              <h1>Sharan</h1>
            </a>
            {/* ***** Logo End ***** */}
            {/* ***** Menu Start ***** */}
            <ul className="nav">
           <li><Link to='/'>Home</Link></li> 
             <li><Link to='/about'>About</Link></li>
             <li><Link to="/service">Services</Link></li>
             <li><Link to="/tour">Tour Packages</Link></li>
             <li><Link to="/contact">Contact</Link></li>
             <li><a href="#"><i class="fa fa-calendar"></i> Schedule a visit</a></li>
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
  )
}

