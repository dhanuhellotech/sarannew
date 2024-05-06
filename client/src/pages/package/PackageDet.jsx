import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/customhooks/common/Header/Header";
import { client } from "../../components/clientaxios/Client";

export default function PackageDet() {
  const [packageDetail, setPackageDetail] = useState(null);
  const[pacde,setPacde]= useState();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPackageDetail(id);
      console.log(id);
    }
  }, [id]);
  
  const fetchPackageDetail = async (id) => {
    try {
      const response = await client.get(`/package/package/${id}/details`);
      console.log(response.data);
      setPackageDetail(response.data.package);
      setPacde(response.data.packageDetails);
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };
  
  // Add this line to check the structure of packageDetail
  
  // Accessing numberOfDays
  const numberOfDays = packageDetail?.packageDetails?.numberOfDays;
  console.log(numberOfDays); // Add this line to check the value of numberOfDays
  
  // Accessing includes
  const includes = packageDetail?.packageDetails?.includes;
  console.log(includes); // Add this line to check the value of includes
  
  // Accessing excludes
  const excludes = packageDetail?.packageDetails?.excludes;
  console.log(excludes); // Add this line to check the value of excludes
  

  if (!packageDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
          <div className="col-lg-12">
  <span className="breadcrumb">
    <a href="#">Home</a> / {packageDetail.name}
  </span>
  <h3>{packageDetail.name}</h3>
</div>

          </div>
        </div>
      </div>

      <div className="section best-deal">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading" style={{ textAlign: "center" }}>
                <h6>| Saran Tours And Travels</h6>
                <h2>Tour Packages</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tabs-content">
                <div className="row">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="appartment"
                      role="tabpanel"
                      aria-labelledby="appartment-tab"
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-3">
                              <div className="info-table">
                                <ul>
                                  <li>
                                    Number of Days{" "}
                                    <span>{pacde.numberOfDays}</span>
                                  </li>
                                  <li>
                                    Number of Persons{" "}
                                    <span>{pacde.numberOfPersons}</span>
                                  </li>
                            
                             
                                </ul>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <img src={packageDetail.imageUrl} alt={packageDetail.name} />
                            </div>
                            <div className="col-lg-3">
                              <h4>{packageDetail.name}</h4>
                              <p>
                                {packageDetail.description}
                              </p>
                              <div className="icon-button">
                                <a href="#">
                                  <i className="fa fa-calendar" /> Schedule a
                                  visit
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h5>Includes:</h5>
          </div>
        </div>
      </div>
      <section className="ftco-section services-section">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 order-md-last heading-section pl-md-5 ftco-animate d-flex align-items-center">
              <div className="w-100">
                <span className="subheading">
                  Welcome to Sharan Tours and Travels
                </span>
                <h2 className="mb-4"> Start your adventure With us </h2>
                <p>
                  {pacde.includes}
                </p>
                <p>
                  <a href="#" className="btn btn-primary --bs-btn-bg py-2 m-3 py-3 px-4">
                    Search Destination
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                  <div
                    className="services services-1 color-1 d-block img"
                    style={{ backgroundImage: "url(images/services-1.jpg)" }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="flaticon-paragliding"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading mb-3">Car Hire</h3>
                      <p className="new">Etios, Innova, Traveller</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                  <div
                    className="services services-1 color-2 d-block img"
                    style={{ backgroundImage: "url(images/services-2.jpg)" }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="flaticon-route"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading mb-3">Corporate Travel</h3>
                      <p className="new">Tailored to your business needs</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                  <div
                    className="services services-1 color-3 d-block img"
                    style={{ backgroundImage: "url(images/services-3.jpg)" }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="flaticon-tour-guide"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading mb-3">Cruises</h3>
                      <p className="new">Explore the high seas</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                  <div
                    className="services services-1 color-4 d-block img"
                    style={{ backgroundImage: "url(images/services-4.jpg)" }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="flaticon-map"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading mb-3">Day Trips</h3>
                      <p className="new">Exciting one-day adventures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h5>Excludes:</h5>
          </div>
        </div>
      </div>
      <section className="ftco-section services-section">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6 order-md-last heading-section pl-md-5 ftco-animate d-flex align-items-center">
              <div className="w-100">
                <span className="subheading">
                  Welcome to Sharan Tours and Travels
                </span>
                <h2 className="mb-4"> Start your adventure With us </h2>
                {pacde.excludes }
  

                <p>
                  <a href="#" className="btn btn-primary --bs-btn-bg py-2 m-3 py-3 px-4">
                    Search Destination
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12 col-lg-6 ftco-animate">
                  <div
                    className="services services-1 color-1 d-block img"
                    style={{ backgroundImage: "url(images/services-1.jpg)" }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="flaticon-paragliding"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading mb-3">Car Hire</h3>
                      <p className="new">Etios, Innova, Traveller</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                  <div
                    className="services services-1 color-2 d-block img"
                    style={{ backgroundImage: "url(images/services-2.jpg)" }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="flaticon-route"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading mb-3">Corporate Travel</h3>
                      <p className="new">Tailored to your business needs</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                  <div
                    className="services services-1 color-3 d-block img"
                    style={{ backgroundImage: "url(images/services-3.jpg)" }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="flaticon-tour-guide"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading mb-3">Cruises</h3>
                      <p className="new">Explore the high seas</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                  <div
                    className="services services-1 color-4 d-block img"
                    style={{ backgroundImage: "url(images/services-4.jpg)" }}
                  >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="flaticon-map"></span>
                    </div>
                    <div className="media-body">
                      <h3 className="heading mb-3">Day Trips</h3>
                      <p className="new">Exciting one-day adventures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
