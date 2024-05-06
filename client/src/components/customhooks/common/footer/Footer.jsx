import React from 'react'
import './footer.css'
export default function Footer() {
  return (
    <div>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <div className="cta-text">
                    <div className="row">
                      <div className="col-md-4">
                        <i className="fas fa-map-marker-alt" />
                      </div>
                      <div className="col-md-8">
                        <h4>Find us</h4>
                        <span>
                          Chempenkulam Building Thekkady, Junction, Kottayam -
                          Kumily Rd, Kumily, Kerala 685509
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-phone" />
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span>9562952223</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open" />
                  <div className="cta-text">
                    <h4>Mail us</h4>
                    <span>sarantoursandtravelskumily@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="index.html">
                      {/* <img src="assets/images/logo/logo.jpg" className="img-fluid" alt="logo"  style={{width:'95px',height:'95px'}}/> */}
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                      Embark on a journey of a lifetime with our top-tier tours
                      and travel services. We specialize in crafting
                      unforgettable experiences that span the globe, ensuring
                      every moment is filled with adventure.
                    </p>
                  </div>
                  <div className="footer-social-icon">
                    <span>Follow us</span>
                    <a href="#">
                      <i className="fab fa-facebook-f facebook-bg" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter twitter-bg" />
                    </a>
                    <a href="#">
                      <i className="fab fa-google-plus-g google-bg" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                 
                    <li>
                      <a href="#">services</a>
                    </li>
                   
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Our Services</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                  </div>
                  <div
                    className="subscribe-form"
                    style={{ borderRadius: "30px" }}
                  >
                    <form action="#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <i className="fab fa-telegram-plane" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 text-center text-lg-left">
                <div className="copyright-text">
                  <p>
                    Copyright © 2024, All Right Reserved{" "}
                    <a href="https://hellowtec.com/">Hello Technologies</a>
                  </p>
                </div>
              </div>
              {/* <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Terms</a>
                    </li>
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                    <li>
                      <a href="#">Policy</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
