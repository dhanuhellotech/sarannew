import React,{useState,useEffect} from 'react';
import { Backdrop, CircularProgress, Box } from "@mui/material";

const Loader = ({open,src}) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 3));
      }, 100);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
  return (
    <Backdrop open={open}>
      <Box
        position="relative"
        display="inline-block"
        width="100px" // Reduced size
        height="100px" // Reduced size
        borderRadius="50%"
        overflow="hidden" // Clip content outside the circle
      >
        <CircularProgress
          color='warning'
          size={100} 
          thickness={2}
          sx={{
            animationDuration: '50000ms',
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "1", 
          }}
        />
        <Box
          position="absolute"
          top="30%"
          left="40%"
          transform="translate(-50%, -50%)"
          zIndex="2" // Ensure the image appears above the circular progress
        >
          <img
            src={src?src:'assets/images/logo/logobg.png'}
            alt="logo"
            width={30} // Reduced image size
            style={{
              objectFit: "contain",
        
            }}
          />
        </Box>
        <Box
          position="absolute"
          width="100%"
          height="100%"
          bgcolor="rgba(138, 116, 179, 0.6)"
          borderRadius="50%" // Ensure the background also has rounded corners
        />
      </Box>
    </Backdrop>
  )
}

export default Loader;

