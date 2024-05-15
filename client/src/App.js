import { useState, useEffect } from "react";
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
import Loader from "./Loader.js"
import Vechicle from "./pages/vechicle/Vechicle.jsx";
function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [showHeader, setShowHeader] = useState(true); // State variable for header visibility
  const [showFooter, setShowFooter] = useState(true); // State variable for footer visibility
  const location = useLocation();
  
  
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    console.log(location);
    // Array of paths where the header and footer should be shown
    const pathsWithHeaderFooter = ['/', '/contact', '/tour', '/service', '/about', '/package/:id', '/services/:id','/vechicle'];
  
    // Check if the current path is in the array of paths
    if (pathsWithHeaderFooter.includes(location.pathname)) {
      setShowHeader(true);
      setShowFooter(true);
    } else {
      setShowHeader(false);
      setShowFooter(false);
    }
  }, [location]);
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
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
    { path: '/services/:id', element: <DetailService /> },
    { path: '/vechicle', element: <Vechicle/> }
  ];

  return (
    <div className="App">
            {/* {loading && <Loader />} */}
      {showPopup && (
        <Popup
          onSubmit={handleFormSubmit}
          onClose={handleCloseFormPopup}
        />
      )}
      {showHeader && <Header />}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showFooter && <Footer />}
      <WhatsApp phoneNumber="95629 52223" message="Hello! I'm interested in your services." />
      <FloatingMailIcon emailAddress="sarantoursandtravelskumily@gmail.com" />
      <a href="" className="btn btn-primary btn-lg-square back-to-top"><i className="fa fa-arrow-up" /></a>

    </div>
  );
}

export default App;
