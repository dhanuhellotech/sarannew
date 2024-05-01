import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/customhooks/common/Header/Header";
import { client } from "../../components/clientaxios/Client";

export default function PackageDet() {
  const [packageDetail, setPackageDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPackageDetail(id);
    }
  }, [id]);

  const fetchPackageDetail = async (id) => {
    try {
      const response = await client.get(`/package/${id}`);
      setPackageDetail(response.data);
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

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
                <a href="#">Home</a> / Single Property
              </span>
              <h3>Single Property</h3>
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
                                    <span>{packageDetail.numberOfDays}</span>
                                  </li>
                                  <li>
                                    Number of Persons{" "}
                                    <span>{packageDetail.numberOfPersons}</span>
                                  </li>
                                  <li>
                                    Number of rooms{" "}
                                    <span>{packageDetail.numberOfRooms}</span>
                                  </li>
                                  <li>
                                    Parking Available{" "}
                                    <span>
                                      {packageDetail.parkingAvailable
                                        ? "Yes"
                                        : "No"}
                                    </span>
                                  </li>
                                  <li>
                                    Payment Process{" "}
                                    <span>{packageDetail.paymentProcess}</span>
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
                  Saran Tours and Travels is your one-stop travel companion,
                  offering a plethora of services to enhance your travel
                  experience. From car rentals to corporate travel arrangements,
                  exciting cruises to curated day trips, and family vacations to
                  group tours, we've got everything covered. With seamless
                  flight bookings spanning across continents and a variety of
                  accommodation options, including exclusive rooms and
                  homestays, your comfort is our priority. Simplify your journey
                  with our bus ticketing and fastag services, and ensure peace
                  of mind with our travel insurance plans. Explore India's
                  beauty with our diverse tour options, and let us handle your
                  passport, PAN card, and visa needs. Whether it's train
                  tickets, vehicle insurance, or mobile recharges, Saran Tours
                  and Travels is here to make your travel dreams a reality.
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
                <p>
                  Saran Tours and Travels is your one-stop travel companion,
                  offering a plethora of services to enhance your travel
                  experience. From car rentals to corporate travel arrangements,
                  exciting cruises to curated day trips, and family vacations to
                  group tours, we've got everything covered. With seamless
                  flight bookings spanning across continents and a variety of
                  accommodation options, including exclusive rooms and
                  homestays, your comfort is our priority. Simplify your journey
                  with our bus ticketing and fastag services, and ensure peace
                  of mind with our travel insurance plans. Explore India's
                  beauty with our diverse tour options, and let us handle your
                  passport, PAN card, and visa needs. Whether it's train
                  tickets, vehicle insurance, or mobile recharges, Saran Tours
                  and Travels is here to make your travel dreams a reality.
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
