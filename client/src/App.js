import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import { Routes, Route } from 'react-router-dom';
import Contact from './pages/contact/Contact';
import Tour from './pages/home/Tour';
import Service from './pages/services/Service';
import About from './pages/about/About';
import NotFoundPage from './components/customhooks/common/NotFoundpage';
function App() {
  // Define an array of route objects
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/contact', element: <Contact /> },
    { path: '/tour', element: <Tour /> },
    { path: '/service', element: <Service /> },
    { path: '/about', element: <About /> }
  ];

  return (
    <div className="App">
      <Routes>
        {/* Map over the routes array to render Route components */}
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
