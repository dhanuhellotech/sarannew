import React, { useState, lazy, Suspense ,useEffect} from "react";
import { Button, Grid, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Route, Routes } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import Home from "../ProtectedRoutes/Home";
import {useSelector,useDispatch} from "react-redux"
import { openMenu,closeMenu } from "../Redux/MenuSlice";

import Loader from "../../Loader.js";
const LazyPackage = lazy(()=> import("../ProtectedRoutes/packages/Package.jsx"))
const LazyVehicle = lazy(()=> import("../ProtectedRoutes/Vechicle/Vechicleadmin.jsx"))
const LazyPackageDetail = lazy(()=>import ("../ProtectedRoutes/detailpackage/PackageDetail.jsx"))
const LazyTour = lazy(()=> import("../ProtectedRoutes/tourform/Tour.jsx"))
const LazyContact = lazy(()=>import("../ProtectedRoutes/contact/Contact.jsx"))
const DashboardLayout = ({ children,showMenu}) => {
  const dispatch = useDispatch()
  const [setnewDisplay, setsetNewDisplay] = useState(false)

  const displayData = useSelector(state=>state.menu.value.display)

  useEffect(()=>{
    console.log(displayData)
  },[displayData])
 
  return (
    <Grid container height="100%">
      <Grid
        item
        xs={12}
        sm={0}
        sx={{
          display: { xs: displayData ? "block" : "none", sm: "none" },
          backgroundColor: "#0D2259",
          height: "100vh",
          overflowY:"scroll",
          py:3,
          boxShadow:"2px 2px 2px 0.3 black"
        }}
      >
        <Button onClick={()=>dispatch(closeMenu())}>
          <CloseIcon />
        </Button>
        {children}
      </Grid>
      <Grid
        item
        xs={0}
        sm={3}
        lg={2}
        sx={{
          backgroundColor: "#0D2259",
          height: "100vh",
          overflowY:"scroll",
          py:3,
          display: { xs: "none", sm: "block" },
        }}
      >
        {children}
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        lg={10}
        direction="column"
        sx={{ display: { xs: displayData ? "none" : "block", sm: "block" } }}
      >
        <Grid
          item
          sx={{
            height: { xs: "60px", sm: "0px" },
            display: { xs: displayData ? "none" : "block", sm: "none" },
          }}
        >
          <Box width="100%" height="100%" justifyContent="center">
            <Button onClick={()=>dispatch(openMenu())}>
              <MenuIcon />
            </Button>
          </Box>
        </Grid>
        <Grid item p={2} height={'100vh'}sx={{overflowY:'scroll'}}>
        <Routes>
  <Route path="/" element={<Home />} />

  <Route
    path="/tour"
    element={
      <Suspense fallback={<Loader open={true} />}>
        <LazyTour />
      </Suspense>
    }
  />
  
  <Route
    path="/package"
    element={
      <Suspense fallback={<Loader open={true} />}>
        <LazyPackage />
      </Suspense>
    }
  />
    <Route
    path="/vehicle"
    element={
      <Suspense fallback={<Loader open={true} />}>
        <LazyVehicle />
      </Suspense>
    }
  />
     <Route
    path="/contact"
    element={
      <Suspense fallback={<Loader open={true} />}>
        <LazyContact />
      </Suspense>
    }
  />
      <Route
    path="/packagedetail"
    element={
      <Suspense fallback={<Loader open={true} />}>
        <LazyPackageDetail />
      </Suspense>
    }
  />
</Routes>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
