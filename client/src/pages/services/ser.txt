import React from 'react'
import Header from '../../components/customhooks/common/Header/Header'
import Footer from '../../components/customhooks/common/footer/Footer'
import './service.css'
export default function Service() {
  return (
    <div>
      <Header/>

<div>

<div class="page-heading header-text">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          {/* <span class="breadcrumb"><a href="#">Home</a> / Properties</span> */}
          <h3>About</h3>
        </div>
      </div>
    </div>
  </div>
  {/* END nav */}
{/* 
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
  </section> */}
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

</div>

      <Footer/>
    </div>
  )
}
