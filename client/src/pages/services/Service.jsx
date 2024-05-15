import React, { useState, useEffect } from 'react';
import Header from '../../components/customhooks/common/Header/Header';
import Footer from '../../components/customhooks/common/footer/Footer';
import './service.css';
import { client } from '../../components/clientaxios/Client';
import { Link } from 'react-router-dom'; 
export default function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  useEffect(() => {
    // Fetch service data when the component mounts
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await client.get('/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleServiceClick = async (serviceId) => {
    try {
      setLoading(true);
      const response = await client.get(`/services/${serviceId}`);
      setSelectedService(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching service details:', error);
      setLoading(false);
    }
  }
  return (
    <div>

      <div>
        {/* Your existing HTML code */}
        <div class="page-heading header-text">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          {/* <span class="breadcrumb"><a href="#">Home</a> / Properties</span> */}
          <h3>Service</h3>
        </div>
      </div>
    </div>
  </div>

  <div className=' text-center' >         
              
              
</div>
        <section className="ftco-section ">
        <p  className="text-color3 text-5xl font-bold uppercase font-secondary my-4 p-2">saran Tours <span className="text-color1"> Special</span> Services</p>

          <div className="container">

 
  
   <div className="row">
    
              {/* Map over the services data to render each service */}
              {services.map((service, index) => (
  <div className="col-md-4 ftco-animate" key={index}>
    <div className="project-wrap">
    <Link to={`/services/${service._id}`} className="img" style={{ backgroundImage: `url(${service.image})` }}>
  <span className="price">${service.servicePrice}/person</span>
</Link>
      <div className="text p-4">
        <span className="days">{service.days} Days Tour</span>
        <h3><a href="#">{service.serviceName}</a></h3>
        <p className="location"><span className="fa fa-map-marker" /> {service.location}</p>
   <ul>
  <li><span className="flaticon-shower" />2</li>
  <li><span className="flaticon-king-size" />3</li>
  <li><span className="flaticon-mountains" />Near Mountain</li>
</ul>

      </div>
    </div>
  </div>
))}

            </div>
          </div>
        </section>

        {/* Your existing HTML code */}
      </div>
    
    </div>
  );
}
