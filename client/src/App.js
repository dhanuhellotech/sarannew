import { useState,useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import './App.css';
import Home from './pages/home/Home';

import Contact from './pages/contact/Contact';
import Tour from './pages/tour/Tour';
import Service from './pages/services/Service';
import About from './pages/about/About';
import NotFoundPage from './components/customhooks/common/NotFoundpage';
import PackageDet from './pages/package/PackageDet';
import WhatsApp from './components/whatsapp/WhatsApp.jsx'
import Footer from './components/customhooks/common/footer/Footer.jsx';
import DetailService from './pages/services/DetailService.jsx';
import Header from './components/customhooks/common/Header/Header.jsx';
import FloatingMailIcon from './components/email floating icon/Floating.jsx';
import Popup from './components/popup/Popup.jsx';
function App() {

  const [showPopup, setShowPopup] = useState(true);
  const location = useLocation();

  useEffect(()=>{
    console.log(location)
  },[location])

  const handleFormSubmit = () => {
    // Your form submit logic goes here
    console.log("Form submitted");
  };

  // Define handleCloseFormPopup function
  const handleCloseFormPopup = () => {
    setShowPopup(false);
  };

  // Hide popup when navigating to a different page
  const handleNavigation = () => {
    setShowPopup(false);
  };

  // Define an array of route objects
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/contact', element: <Contact /> },
    { path: '/tour', element: <Tour /> },
    { path: '/service', element: <Service /> },
    { path: '/about', element: <About /> },
    { path: '/package/:id', element: <PackageDet /> },
    { path: '/services/:id', element: <DetailService /> }
  ];

  return (
    <div className="App">
        {/* {location.pathname !== "/*" && showPopup && (
        <Popup
          onSubmit={handleFormSubmit}
          onClose={handleCloseFormPopup}
      
        />
      )} */}
      <Header/>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
   
    <WhatsApp phoneNumber="95629 52223" message="Hello! I'm interested in your services." />
    <FloatingMailIcon emailAddress="sarantoursandtravelskumily@gmail.com"/>

    <Footer/>
  </div>
  );
}

export default App;
