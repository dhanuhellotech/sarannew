import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/customhooks/common/Header/Header";
import { client } from "../../components/clientaxios/Client";
import Footer from "../../components/customhooks/common/footer/Footer";
// import './pac.css'
export default function PackageDet() {
  const [packageDetail, setPackageDetail] = useState(null);
  const [pacde, setPacde] = useState();
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
      <Header />
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
                              <img
                                src={packageDetail.imageUrl}
                                alt={packageDetail.name}
                              />
                            </div>
                            <div className="col-lg-3">
                              <h4>{packageDetail.name}</h4>
                              <p>{packageDetail.description}</p>
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
        <section className="ftco-section services-section">
          <div className="container">
            <div className="row d-flex">
              <div className="col-md-6  heading-section pl-md-5 ftco-animate d-flex align-items-center">
                <div className="w-100">
                  <span className="subheading">
                    Welcome to Sharan Tours and Travels
                  </span>
                  <h2 className="mb-4">Start your adventure With us</h2>
                  <h6 style={{ fontSize: "16px" }}>
                    <span style={{ color: "#ff5959" }} className="fw-bold">
                      "ULAGAM SUTRALAM VANGA"
                    </span>{" "}
                    <br></br>
                    <div className="mt-3">
                      ANYWHERE TO ANYWHERE SARAN TOURS AND TRAVELS BOOKING
                      TICKETS: Bus,Train & Flight.<br></br>
                    </div>
                    <div className="mt-3">
                      <span className="fw-bold">TOUR PACKAGES:</span>
                      <span>
                        Schools,Colleges,Honeymoon Couple,Private,Family &
                        Pilgrimages.
                      </span>
                    </div>
                    <br></br>
                    <span>
                      {" "}
                      <span className="fw-bold">DAY VISIT:</span> Jeep
                      Safari,Forest Adventures,Elephant Ride,Plantation
                      Visit,Eco Tourism.
                    </span>
                  </h6>
                  <p>
                    <a
                      href="#"
                      className="btn btn-primary --bs-btn-bg py-2 m-3 py-3 px-4"
                    >
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

        <div className="row">
          <div className="col-lg-12">
            <h5 className="mt-5 fw-bold h6" style={{ fontSize: "20px" }}>
              Includes:
            </h5>
            <p style={{ textAlign: "left" }}>{pacde.includes}</p>
          </div>

          <div className="col-lg-12">
            <h5 className="mt-5 fw-bold h6" style={{ fontSize: "20px" }}>
              Excludes:
            </h5>
            <p style={{ textAlign: "left" }}>{pacde.excludes}</p>
          </div>
        </div>
      </div>
      <section className="w-full d-flex flex-column justify-content-center lg-h-800">
        <div className="container w-full px-lg-5 px-0 py-5 py-xl-10">
          <p className="text-color4 text-uppercase px-3 px-xl-5">
            Days To Travel
          </p>
          <p className="text-3xl px-3 px-xl-5 font-secondary text-color1">
            Travel <span className="text-color3">Description</span>
          </p>
          <div className="w-full d-flex flex-wrap py-5 py-xl-10 px-3 px-xl-0">
            <div className="w-100 position-lg-relative grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-4 gap-md-6 text-left">
              {/* Check if packageDetail.days is defined before mapping */}
              {pacde.days ? (
                pacde.days.map((day, index) => (
                  <div
                    key={index}
                    className="d-flex flex-column justify-content-between align-items-center"
                  >
                    {/* Display day */}
                    {/* <p className="text-lg font-bold text-right text-color3">Day {day.dayNumber}</p> */}
                    {/* Display description */}
                    <p className="text-lg text-color6  mt-4">
                      <p className="text-lg font-bold text-color3">
                        Day{day.dayNumber}
                      </p>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      {day.description}
                    </p>
                    {/* Other content */}
                    <div className="mt-6 d-flex justify-content-center align-items-center">
                      {/* Add your buttons or links here */}
                    </div>
                  </div>
                ))
              ) : (
                <p>No days available</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
