import React, { useState, useEffect } from 'react';
import Loader from '../../components/customhooks/common/loader/Loader';
import Header from '../../components/customhooks/common/Header/Header';
import { client } from '../../components/clientaxios/Client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useScript } from '../../components/customhooks/Script';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/common/footer/Footer'
export default function Tour() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readArray, setReadArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    client.get('/package')
      .then(response => {
        setProperties(response.data)
        setLoading(false);
        const read = Array(response.data.length).fill(false);
        setReadArray(read);
      })
      .catch(error => console.error('Error fetching properties:', error));
  };

  const handleRead = (i) => {
    setReadArray(prev => {
      const newArr = [...prev];
      newArr[i] = !newArr[i];
      return newArr;
    });
  };
  const filterProperties = async (category) => {
    try {
      setLoading(true); // Set loading state to true while fetching data
      if (category === 'All') {
        // Fetch all properties
        await fetchProperties();
      } else {
        // Fetch properties based on the selected category
        const response = await client.get('/package');
        const filteredProperties = response.data.filter(property => property.category === category);
        setProperties(filteredProperties);
      }
      setSelectedCategory(category);
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error filtering properties:', error);
      setLoading(false); // Set loading state to false if an error occurs
    }
  };
  // useScript('vendor/jquery/jquery.min.js')
  // useScript('vendor/bootstrap/js/bootstrap.min.js')
  // useScript('assets/js/isotope.min.js')
  // useScript('assets/js/owl-carousel.js')
  // useScript('assets/js/counter.js')
  // useScript('assets/js/custom.js')
  return (
    <div>
 
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="breadcrumb"><a href="#">Home</a> /Tour Packages</span>
              <h3>Tour Packages</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="section properties">
        <div className="container">
    <ul className="properties-filter">
            <li>
              <a className={selectedCategory === 'All' ? 'is_active' : ''} onClick={() => filterProperties('All')}>Show All</a>
            </li>
            <li>
              <a className={selectedCategory === 'North Indian' ? 'is_active' : ''} onClick={() => filterProperties('North Indian')}>North Indian Tours</a>
            </li>
            <li>
              <a className={selectedCategory === 'South Indian' ? 'is_active' : ''} onClick={() => filterProperties('South Indian')}>South Indian Tours</a>
            </li>
            <li>
              <a className={selectedCategory === 'Group Tours' ? 'is_active' : ''} onClick={() => filterProperties('Group Tours')}>Group Tours</a>
            </li>
            <li>
              <a className={selectedCategory === 'Honeymoon Tours' ? 'is_active' : ''} onClick={() => filterProperties('Honeymoon Tours')}>Honeymoon Tours</a>
            </li>
          </ul>
    
          {loading ? (
            <Loader />
          ) : (
            <div className="row properties-box">
              {properties.map((property, index) => (
                <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6" key={index}>
                  <div className="item">
                    <a href="/"><img src={property.imageUrl} alt={property.name} /></a>
                    <span className="category">
                      {[...Array(property.stars)].map((_, index) => (
                        <FontAwesomeIcon color='#FBBC23' icon={faStar} key={index} />
                      ))}
                    </span>
                    <h6>${property.price}</h6>
                 
                    <h4><a href="/">{property.name}</a></h4>
    
                    <ul>
                      <li>
                        {/* Description:  */}
                        <span>
                          {readArray[index] ? property.description : property.description.split(' ').slice(0, 10).join(' ')}
                          {property.description.split(' ').length > 10 && (
                            <p
                              style={{  margin: '10px', color: '#0D2259' }}
                              onClick={() => handleRead(index)}
                            >
                              {readArray[index] ? 'Read less' : 'Read more...'}
                            </p>
                          )}
                        </span>
                      </li>
                      {/* Other property details */}
                    </ul>
                    <div className="main-button">
                    <Link to={`/package/${property.name}`}>View Details</Link>

</div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
