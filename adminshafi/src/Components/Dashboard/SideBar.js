import React,{useState,useEffect} from "react";
import { Box, Button, Grid, Typography,useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloseIcon from '@mui/icons-material/Close';
import ButtonLink from "./ButtonLink";
import {useNavigate} from "react-router-dom"
const SideBar = ({closemenu}) => {
const navigate =useNavigate();
// Initialize sessionTimeout state
const [sessionTimeout, setSessionTimeout] = useState(null);

useEffect(() => {
  // Set a timeout for 2 hours when the component mounts
  const timeoutId = setTimeout(() => {
    // Call the logout function after 2 hours
    logout();
  }, 1 * 60 * 60 * 1000); // 2 hours in milliseconds

  // Save the timeout ID to state
  setSessionTimeout(timeoutId);

  // Clear the timeout when the component unmounts
  return () => {
    clearTimeout(timeoutId);
  };
}, []);

const logout = () => {
  // Remove the auth token from localStorage
  localStorage.removeItem("auth");
  // Clear any existing timeout
  clearTimeout(sessionTimeout);

  // Redirect the user to the login page
  navigate("/login");
};





  return (
    <Grid container
      height="100vh"
      paddingBottom="20px"
      width="100%"
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{overflowY:"scroll",paddingTop:"5px"}}
    >
     <Grid item  display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="25%" >
        <img src="assets/logo/Saran Tours & Travels Kumily Logo Rounded.png"  width="25%" style={{borderRadius:"15px",marginBottom:"10px"}}/>
        <Typography variant="h6 text-white">Welcome Admin</Typography>
     </Grid>
     <Grid item direction="column" height="75%" width="100%" paddingLeft={1} paddingRight={1}>
        <ButtonLink  path="/" text="Home"/>
<ButtonLink path="/tour" text="TourForm"/>
<ButtonLink path="/vehicle" text="VehicleForm"/>
<ButtonLink path="/contact" text="Contact"/>
<ButtonLink path="/package" text="Package"/>
<ButtonLink path="/packagedetail" text="PackageDetail"/>
<ButtonLink path="/service" text="Service"/>
<ButtonLink path="/topbar" text="Topbar"/>
<ButtonLink path="/address" text="Address"/>
<ButtonLink path="/enquiry" text="Enquiry"/>
           <button 
  onClick={logout}
        style={{ 
          display: 'block', 
          margin: 'auto', 
          color: 'black', // Change text color
          backgroundColor: '#FBBC23', // Change background color
          borderRadius: '5px', // Add rounded corners
          padding: '10px 20px', // Add padding
          border: 'none', // Remove border
          cursor: 'pointer' // Change cursor on hover
        }}
      >
     logout
      </button>
     </Grid>
    </Grid>
  );
};

export default SideBar;
