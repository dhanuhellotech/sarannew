import React,{useState,useEffect,useRef} from 'react'
import { useScript } from '../../components/customhooks/Script'
import Loader from '../../components/customhooks/common/loader/Loader';
import Header from '../../components/customhooks/common/Header/Header'
import Footer from './../../components/customhooks/common/footer/Footer';
import './about.css'
export default function About() {
  // useScript('vendor/jquery/jquery.min.js')
  // useScript('vendor/bootstrap/js/bootstrap.min.js')
  // useScript('assets/js/isotope.min.js')
  // useScript('assets/js/owl-carousel.js')
  // useScript('assets/js/counter.js')
  // useScript('assets/js/custom.js')
  const [clients, setClients] = useState(0);
  const [projects, setProjects] = useState(0);
  const [countries, setCountries] = useState(0);
  const [coffees, setCoffees] = useState(0);

  const clientsRef = useRef(null);
  const projectsRef = useRef(null);
  const countriesRef = useRef(null);
  const coffeesRef = useRef(null);

  useEffect(() => {
    const clientsCounter = clientsRef.current;
    const projectsCounter = projectsRef.current;
    const countriesCounter = countriesRef.current;
    const coffeesCounter = coffeesRef.current;

    const handleScroll = () => {
      const clientsTop = clientsCounter.getBoundingClientRect().top;
      const projectsTop = projectsCounter.getBoundingClientRect().top;
      const countriesTop = countriesCounter.getBoundingClientRect().top;
      const coffeesTop = coffeesCounter.getBoundingClientRect().top;

      if (clientsTop < window.innerHeight) incrementCounter(setClients, 255);
      if (projectsTop < window.innerHeight) incrementCounter(setProjects, 1176);
      if (countriesTop < window.innerHeight) incrementCounter(setCountries, 39);
      if (coffeesTop < window.innerHeight) incrementCounter(setCoffees, 127);
    };

    const incrementCounter = (setState, maxValue) => {
      setState(prevCount => {
        if (prevCount >= maxValue) return prevCount;
        return prevCount + 1;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    // Stop counting on mouse enter
  };

  const handleMouseLeave = () => {
    // Resume counting on mouse leave
  };

  return (
    <>

    <div className='about'>
  

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
      <section className="ftco-section services-section">
      <div className="container">
        <div className="row d-flex">
          <div className="col-md-6 order-md-last heading-section pl-md-5 ftco-animate d-flex align-items-center">
            <div className="w-100">
              <span className="subheading">Welcome to Sharan Tours and Travels</span>
              <h2 className="mb-4"> Start your adventure With us </h2>
              {/* <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p> */}
              <p >Saran Tours and Travels is your one-stop travel companion, offering a plethora of services to enhance your travel experience. From car rentals to corporate travel arrangements, exciting cruises to curated day trips, and family vacations to group tours, we've got everything covered. With seamless flight bookings spanning across continents and a variety of accommodation options, including exclusive rooms and homestays, your comfort is our priority. Simplify your journey with our bus ticketing and fastag services, and ensure peace of mind with our travel insurance plans. Explore India's beauty with our diverse tour options, and let us handle your passport, PAN card, and visa needs. Whether it's train tickets, vehicle insurance, or mobile recharges, Saran Tours and Travels is here to make your travel dreams a reality.</p>
              <p><a href="#" className="btn btn-primary --bs-btn-bg  py-2 m-3 py-3 px-4">Search Destination</a></p>
            </div>
          </div>
          <div className="col-md-6">
      <div className="row">
        <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
          <div className="services services-1 color-1 d-block img" style={{backgroundImage: 'url(images/services-1.jpg)'}}>
            <div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-paragliding"></span></div>
            <div className="media-body">
              <h3 className="heading mb-3">Car Hire</h3>
              <p className='new'>Etios, Innova, Traveller</p>
            </div>
          </div>      
        </div>
        <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
          <div className="services services-1 color-2 d-block img" style={{backgroundImage: 'url(images/services-2.jpg)'}}>
            <div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-route"></span></div>
            <div className="media-body">
              <h3 className="heading mb-3">Corporate Travel</h3>
              <p className='new'>Tailored to your business needs</p>
            </div>
          </div>    
        </div>
        <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
          <div className="services services-1 color-3 d-block img" style={{backgroundImage: 'url(images/services-3.jpg)'}}>
            <div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-tour-guide"></span></div>
            <div className="media-body">
              <h3 className="heading mb-3">Cruises</h3>
              <p className='new'>Explore the high seas</p>
            </div>
          </div>      
        </div>
        <div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
          <div className="services services-1 color-4 d-block img" style={{backgroundImage: 'url(images/services-4.jpg)'}}>
            <div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-map"></span></div>
            <div className="media-body">
              <h3 className="heading mb-3">Day Trips</h3>
              <p className='new'>Exciting one-day adventures</p>
            </div>
          </div>      
        </div>
      </div>
    </div>
        </div>
      </div>
    </section>
    <div className="milestones">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 milestone_col">
              <div className="milestone text-center">
                <div className="milestone_icon"><img src="images/milestone_1.png" alt /></div>
                <div className="milestone_counter" ref={clientsRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{clients}</div>
                <div className="milestone_text">Clients</div>
              </div>
            </div>
            <div className="col-lg-3 milestone_col">
              <div className="milestone text-center">
                <div className="milestone_icon"><img src="images/milestone_2.png" alt /></div>
                <div className="milestone_counter" ref={projectsRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{projects}</div>
                <div className="milestone_text">Projects</div>
              </div>
            </div>
            <div className="col-lg-3 milestone_col">
              <div className="milestone text-center">
                <div className="milestone_icon"><img src="images/milestone_3.png" alt /></div>
                <div className="milestone_counter" ref={countriesRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{countries}</div>
                <div className="milestone_text">Countries</div>
              </div>
            </div>
            <div className="col-lg-3 milestone_col">
              <div className="milestone text-center">
                <div className="milestone_icon"><img src="images/milestone_4.png" alt /></div>
                <div className="milestone_counter" ref={coffeesRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{coffees}</div>
                <div className="milestone_text">Trips</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <section className="ftco-section ftco-about img" style={{backgroundImage: 'url(images/bg_4.jpg)'}}>
  <div className="overlay" />
  <div className="container py-md-5">
    <div className="row py-md-5">
      <div className="col-md d-flex align-items-center justify-content-center">
        <a href="https://vimeo.com/45830194" className="icon-video popup-vimeo d-flex align-items-center justify-content-center mb-4">
          <span className="fa fa-play" />
        </a>
      </div>
    </div>
  </div>
</section>

<section className="ftco-section ftco-about ftco-no-pt img">
  <div className="container">
    <div className="row d-flex">
      <div className="col-md-12 about-intro">
        <div className="row">
          <div className="col-md-6 d-flex align-items-stretch">
            <div className="img d-flex w-100 align-items-center justify-content-center" style={{backgroundImage: 'url(images/bg_1.jpg)'}}>
            </div>
          </div>
          <div className="col-md-6 pl-md-5 py-5">
            <div className="row justify-content-start pb-3">
              <div className="col-md-12 heading-section ftco-animate">
                <span className="subheading">About Us</span>
                <h2 className="mb-4">Make Your Tour Memorable and Safe With Us</h2>
                <p >Welcome to Saran Tours and Travels, your ultimate destination for hassle-free bookings and unforgettable travel experiences. At Saran Tours and Travels, we specialize in providing seamless ticket bookings for buses, trains, and flights, ensuring you reach your desired destination with ease. Whether you're planning a school trip, college excursion, romantic honeymoon, private getaway, family vacation, or spiritual pilgrimage, we have tailored tour packages to suit every need. Additionally, indulge in our day visit options, including thrilling jeep safaris, adventurous forest expeditions, serene elephant rides, immersive plantation visits, and eco-friendly tourism experiences. Join us at Saran Tours and Travels and embark on a journey of discovery, adventure, and relaxation.</p>
                <p><a href="#" className="btn btn-primary justify-content-between py-2 m-3" >Book Your Destination</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

 


    </div>
    </>
  )
}
