import React, { useState, useEffect } from 'react';
import Loader from '../../loader/Loader';

import { client } from '../../../../clientaxios/Client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { faStar } from '@fortawesome/free-solid-svg-icons';
export default function Tours() {
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
         <h3 className='display-5 mt-5' style={{fontWeight:'400'

         }}>Tour Packages</h3>
      <div className="section properties" style={{backgroundColor:'#0D2259'}}>
        <div className="container">

    {/* <ul className="properties-filter">
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
          </ul> */}
    
          {loading ? (
            <Loader />
          ) : (
            
            <div className="row properties-box">

              {properties.slice(0,6).map((property, index) => (
                <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items col-md-6 mt-5" key={index}>
                  <div className="item">
                    <a href="property-details.html"><img src={property.imageUrl} alt={property.name} /></a>
                    <span className="category">
                      {[...Array(property.stars)].map((_, index) => (
                        <FontAwesomeIcon color='#FBBC23' icon={faStar} key={index} />
                      ))}
                    </span>
                    <h6>${property.price}</h6>
                 
                    <h4><a href="property-details.html">{property.name}</a></h4>

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
