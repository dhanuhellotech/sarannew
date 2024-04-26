import React from 'react'
import Header from '../../components/customhooks/common/Header/Header'
import Footer from '../../components/customhooks/common/footer/Footer'

export default function Service() {
  return (
    <div>
      <Header/>

<div>
  <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div className="container">
      <a className="navbar-brand" href="index.html">Pacific<span>Travel Agency</span></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="oi oi-menu" /> Menu
      </button>
      <div className="collapse navbar-collapse" id="ftco-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item"><a href="index.html" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
          <li className="nav-item active"><a href="destination.html" className="nav-link">Destination</a></li>
          <li className="nav-item"><a href="hotel.html" className="nav-link">Hotel</a></li>
          <li className="nav-item"><a href="blog.html" className="nav-link">Blog</a></li>
          <li className="nav-item"><a href="contact.html" className="nav-link">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>
  {/* END nav */}
  <section className="hero-wrap hero-wrap-2 js-fullheight" style={{backgroundImage: 'url("images/bg_1.jpg")'}}>
    <div className="overlay" />
    <div className="container">
      <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-center">
        <div className="col-md-9 ftco-animate pb-5 text-center">
          <p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="fa fa-chevron-right" /></a></span> <span>Tour List <i className="fa fa-chevron-right" /></span></p>
          <h1 className="mb-0 bread">Tours List</h1>
        </div>
      </div>
    </div>
  </section>
  <section className="ftco-section ftco-no-pb">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="search-wrap-1 ftco-animate">
            <form action="#" className="search-property-1">
              <div className="row no-gutters">
                <div className="col-lg d-flex">
                  <div className="form-group p-4 border-0">
                    <label htmlFor="#">Destination</label>
                    <div className="form-field">
                      <div className="icon"><span className="fa fa-search" /></div>
                      <input type="text" className="form-control" placeholder="Search place" />
                    </div>
                  </div>
                </div>
                <div className="col-lg d-flex">
                  <div className="form-group p-4">
                    <label htmlFor="#">Check-in date</label>
                    <div className="form-field">
                      <div className="icon"><span className="fa fa-calendar" /></div>
                      <input type="text" className="form-control checkin_date" placeholder="Check In Date" />
                    </div>
                  </div>
                </div>
                <div className="col-lg d-flex">
                  <div className="form-group p-4">
                    <label htmlFor="#">Check-out date</label>
                    <div className="form-field">
                      <div className="icon"><span className="fa fa-calendar" /></div>
                      <input type="text" className="form-control checkout_date" placeholder="Check Out Date" />
                    </div>
                  </div>
                </div>
                <div className="col-lg d-flex">
                  <div className="form-group p-4">
                    <label htmlFor="#">Price Limit</label>
                    <div className="form-field">
                      <div className="select-wrap">
                        <div className="icon"><span className="fa fa-chevron-down" /></div>
                        <select name id className="form-control">
                          <option value>$5,000</option>
                          <option value>$10,000</option>
                          <option value>$50,000</option>
                          <option value>$100,000</option>
                          <option value>$200,000</option>
                          <option value>$300,000</option>
                          <option value>$400,000</option>
                          <option value>$500,000</option>
                          <option value>$600,000</option>
                          <option value>$700,000</option>
                          <option value>$800,000</option>
                          <option value>$900,000</option>
                          <option value>$1,000,000</option>
                          <option value>$2,000,000</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg d-flex">
                  <div className="form-group d-flex w-100 border-0">
                    <div className="form-field w-100 align-items-center d-flex">
                      <input type="submit" defaultValue="Search" className="align-self-stretch form-control btn btn-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="ftco-section">
    <div className="container">
      <div className="row">
        <div className="col-md-4 ftco-animate">
          <div className="project-wrap">
            <a href="#" className="img" style={{backgroundImage: 'url(images/destination-1.jpg)'}}>
              <span className="price">$550/person</span>
            </a>
            <div className="text p-4">
              <span className="days">8 Days Tour</span>
              <h3><a href="#">Banaue Rice Terraces</a></h3>
              <p className="location"><span className="fa fa-map-marker" /> Banaue, Ifugao, Philippines</p>
              <ul>
                <li><span className="flaticon-shower" />2</li>
                <li><span className="flaticon-king-size" />3</li>
                <li><span className="flaticon-mountains" />Near Mountain</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 ftco-animate">
          <div className="project-wrap">
            <a href="#" className="img" style={{backgroundImage: 'url(images/destination-2.jpg)'}}>
              <span className="price">$550/person</span>
            </a>
            <div className="text p-4">
              <span className="days">10 Days Tour</span>
              <h3><a href="#">Banaue Rice Terraces</a></h3>
              <p className="location"><span className="fa fa-map-marker" /> Banaue, Ifugao, Philippines</p>
              <ul>
                <li><span className="flaticon-shower" />2</li>
                <li><span className="flaticon-king-size" />3</li>
                <li><span className="flaticon-sun-umbrella" />Near Beach</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 ftco-animate">
          <div className="project-wrap">
            <a href="#" className="img" style={{backgroundImage: 'url(images/destination-3.jpg)'}}>
              <span className="price">$550/person</span>
            </a>
            <div className="text p-4">
              <span className="days">7 Days Tour</span>
              <h3><a href="#">Banaue Rice Terraces</a></h3>
              <p className="location"><span className="fa fa-map-marker" /> Banaue, Ifugao, Philippines</p>
              <ul>
                <li><span className="flaticon-shower" />2</li>
                <li><span className="flaticon-king-size" />3</li>
                <li><span className="flaticon-sun-umbrella" />Near Beach</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 ftco-animate">
          <div className="project-wrap">
            <a href="#" className="img" style={{backgroundImage: 'url(images/destination-4.jpg)'}}>
              <span className="price">$550/person</span>
            </a>
            <div className="text p-4">
              <span className="days">8 Days Tour</span>
              <h3><a href="#">Banaue Rice Terraces</a></h3>
              <p className="location"><span className="fa fa-map-marker" /> Banaue, Ifugao, Philippines</p>
              <ul>
                <li><span className="flaticon-shower" />2</li>
                <li><span className="flaticon-king-size" />3</li>
                <li><span className="flaticon-sun-umbrella" />Near Beach</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 ftco-animate">
          <div className="project-wrap">
            <a href="#" className="img" style={{backgroundImage: 'url(images/destination-5.jpg)'}}>
              <span className="price">$550/person</span>
            </a>
            <div className="text p-4">
              <span className="days">10 Days Tour</span>
              <h3><a href="#">Banaue Rice Terraces</a></h3>
              <p className="location"><span className="fa fa-map-marker" /> Banaue, Ifugao, Philippines</p>
              <ul>
                <li><span className="flaticon-shower" />2</li>
                <li><span className="flaticon-king-size" />3</li>
                <li><span className="flaticon-sun-umbrella" />Near Beach</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 ftco-animate">
          <div className="project-wrap">
            <a href="#" className="img" style={{backgroundImage: 'url(images/destination-6.jpg)'}}>
              <span className="price">$550/person</span>
            </a>
            <div className="text p-4">
              <span className="days">7 Days Tour</span>
              <h3><a href="#">Banaue Rice Terraces</a></h3>
              <p className="location"><span className="fa fa-map-marker" /> Banaue, Ifugao, Philippines</p>
              <ul>
                <li><span className="flaticon-shower" />2</li>
                <li><span className="flaticon-king-size" />3</li>
                <li><span className="flaticon-sun-umbrella" />Near Beach</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 ftco-animate">
          <div className="project-wrap">
            <a href="#" className="img" style={{backgroundImage: 'url(images/destination-7.jpg)'}}>
              <span className="price">$550/person</span>
            </a>
            <div className="text p-4">
              <span className="days">7 Days Tour</span>
              <h3><a href="#">Banaue Rice Terraces</a></h3>
              <p className="location"><span className="fa fa-map-marker" /> Banaue, Ifugao, Philippines</p>
              <ul>
                <li><span className="flaticon-shower" />2</li>
                <li><span className="flaticon-king-size" />3</li>
                <li><span className="flaticon-sun-umbrella" />Near Beach</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 ftco-animate">
          <div className="project-wrap">
            <a href="#" className="img" style={{backgroundImage: 'url(images/destination-8.jpg)'}}>
              <span className="price">$550/person</span>
            </a>
            <div className="text p-4">
              <span className="days">7 Days Tour</span>
              <h3><a href="#">Banaue Rice Terraces</a></h3>
              <p className="location"><span className="fa fa-map-marker" /> Banaue, Ifugao, Philippines</p>
              <ul>
                <li><span className="flaticon-shower" />2</li>
                <li><span className="flaticon-king-size" />3</li>
                <li><span className="flaticon-sun-umbrella" />Near Beach</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 ftco-animate">
          <div className="project-wrap">
            <a href="#" className="img" style={{backgroundImage: 'url(images/destination-9.jpg)'}}>
              <span className="price">$550/person</span>
            </a>
            <div className="text p-4">
              <span className="days">7 Days Tour</span>
              <h3><a href="#">Banaue Rice Terraces</a></h3>
              <p className="location"><span className="fa fa-map-marker" /> Banaue, Ifugao, Philippines</p>
              <ul>
                <li><span className="flaticon-shower" />2</li>
                <li><span className="flaticon-king-size" />3</li>
                <li><span className="flaticon-sun-umbrella" />Near Beach</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col text-center">
          <div className="block-27">
            <ul>
              <li><a href="#">&lt;</a></li>
              <li className="active"><span>1</span></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a href="#">&gt;</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="ftco-intro ftco-section ftco-no-pt">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 text-center">
          <div className="img" style={{backgroundImage: 'url(images/bg_2.jpg)'}}>
            <div className="overlay" />
            <h2>We Are Pacific A Travel Agency</h2>
            <p>We can manage your dream building A small river named Duden flows by their place</p>
            <p className="mb-0"><a href="#" className="btn btn-primary px-4 py-3">Ask For A Quote</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer className="ftco-footer bg-bottom ftco-no-pt" style={{backgroundImage: 'url(images/bg_3.jpg)'}}>
    <div className="container">
      <div className="row mb-5">
        <div className="col-md pt-5">
          <div className="ftco-footer-widget pt-md-5 mb-4">
            <h2 className="ftco-heading-2">About</h2>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <ul className="ftco-footer-social list-unstyled float-md-left float-lft">
              <li className="ftco-animate"><a href="#"><span className="fa fa-twitter" /></a></li>
              <li className="ftco-animate"><a href="#"><span className="fa fa-facebook" /></a></li>
              <li className="ftco-animate"><a href="#"><span className="fa fa-instagram" /></a></li>
            </ul>
          </div>
        </div>
        <div className="col-md pt-5 border-left">
          <div className="ftco-footer-widget pt-md-5 mb-4 ml-md-5">
            <h2 className="ftco-heading-2">Infromation</h2>
            <ul className="list-unstyled">
              <li><a href="#" className="py-2 d-block">Online Enquiry</a></li>
              <li><a href="#" className="py-2 d-block">General Enquiries</a></li>
              <li><a href="#" className="py-2 d-block">Booking Conditions</a></li>
              <li><a href="#" className="py-2 d-block">Privacy and Policy</a></li>
              <li><a href="#" className="py-2 d-block">Refund Policy</a></li>
              <li><a href="#" className="py-2 d-block">Call Us</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md pt-5 border-left">
          <div className="ftco-footer-widget pt-md-5 mb-4">
            <h2 className="ftco-heading-2">Experience</h2>
            <ul className="list-unstyled">
              <li><a href="#" className="py-2 d-block">Adventure</a></li>
              <li><a href="#" className="py-2 d-block">Hotel and Restaurant</a></li>
              <li><a href="#" className="py-2 d-block">Beach</a></li>
              <li><a href="#" className="py-2 d-block">Nature</a></li>
              <li><a href="#" className="py-2 d-block">Camping</a></li>
              <li><a href="#" className="py-2 d-block">Party</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md pt-5 border-left">
          <div className="ftco-footer-widget pt-md-5 mb-4">
            <h2 className="ftco-heading-2">Have a Questions?</h2>
            <div className="block-23 mb-3">
              <ul>
                <li><span className="icon fa fa-map-marker" /><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                <li><a href="#"><span className="icon fa fa-phone" /><span className="text">+2 392 3929 210</span></a></li>
                <li><a href="#"><span className="icon fa fa-paper-plane" /><span className="text">info@yourdomain.com</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            Copyright © All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
        </div>
      </div>
    </div>
  </footer>
  {/* loader */}
  <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx={24} cy={24} r={22} fill="none" strokeWidth={4} stroke="#eeeeee" /><circle className="path" cx={24} cy={24} r={22} fill="none" strokeWidth={4} strokeMiterlimit={10} stroke="#F96D00" /></svg></div>
</div>


    </div>
  )
}
