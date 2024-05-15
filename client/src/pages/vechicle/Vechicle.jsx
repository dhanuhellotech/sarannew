import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import FormVehicle from './FormVechicle';
import { client } from '../../components/clientaxios/Client.js'
export default function Vehicle({ vehicles }) {
  // No need to declare vehicles state since it's passed as a prop

  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error
  const [fetchedVehicles, setFetchedVehicles] = useState([]); // State to store fetched vehicles

  // Function to fetch vehicles data
  const fetchVehicles = () => {
    client.get('/trip') // Assuming '/vehicle' is the endpoint for fetching vehicles
      .then(response => {
        setFetchedVehicles(response.data); // Update state with fetched vehicles
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false in case of error
      });
  };

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    fetchVehicles();
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render fetched vehicles
  return (
    <div>
      <FormVehicle/>
      <section className="w-full flex justify-center bg-color7 py-8 ">
        <div className="w-full container 2xl:px-36">
          <div>
            <p className="text-white uppercase px-5">Choose your Vehicles</p>
            <p className="text-5xl font-secondary text-color3 px-5">Special <span className="text-color2">Tour Vehicles</span></p>
            <div className="flex flex-wrap md:justify-between gap-10 px-6 xl:px-0 py-8 lg:px-3 ">
              {fetchedVehicles.map((vehicle, index) => (
                <figure key={index} className="w-full md:w-[45%] xl:w-[30%] h-[450px] relative photo transition-all duration-1000">
                  <div className="w-[100%] h-[100%] bottom-photo absolute bg-white flex flex-col justify-center px-5">
                    <p className="text-3xl text-color3 capitalize font-secondary">{vehicle.name}</p>
                    <p className="text-color1 mb-4">${vehicle.price} / per persons</p>
                    <p className="text-color6">OneWay Trip:{vehicle.oneWayTrip}</p>
                    <div className="flex flex-wrap my-4">
                      <div className="w-[50%] flex"><i className="bi bi-clock text-color4" /><p className="text-color6 ms-2">{vehicle.duration}</p></div>
                      <div className="w-[50%] flex"><i className="bi bi-geo-alt text-color4" /><p className="text-color6 ms-2">{vehicle.state}</p></div>
                      <div className="w-[50%] flex"><i className="bi bi-person text-color4" /><p className="text-color6 ms-2">{vehicle.driverAllowance}+</p></div>
                      <div className="w-[50%] flex"><i className="bi bi-backpack4 text-color4" /><p className="text-color6 ms-2">{vehicle.roundTrip}</p></div>
                      {/* <div className="w-[50%] flex"><i className="bi bi-emoji-smile text-color4" /><p className="text-color6 ms-2">{vehicle.roundTrip} Superb</p></div> */}
                    </div>
                    <a href="#" className="underline decoration-color1 text-color6 flex mb-2">Tour details</a>
                  </div>
                  <img src={vehicle.image} alt="" className="w-[100%] h-[100%] object-cover brightness-75 absolute" />
                  <p className="absolute uppercase text-white bg-color3 px-4 py-1 right-1 top-12 rotate-[-90deg] ">{vehicle.state}</p>
                  <figcaption className="absolute text-white bottom-8 right-10 fig">
                    <p className="capitalize font-secondary text-3xl">{vehicle.name}</p>
                    <p className="text-right">${vehicle.price} / per persons</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
