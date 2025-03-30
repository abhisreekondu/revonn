import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography ,Box,CircularProgress} from '@mui/material';
import ReelCard from '../components/ReelCard';

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:5000/revonn/followingreels/660f6c1b3a4a5b0012345673")  // Your API for fetching reels
      .then((res) =>
        { setReels(res.data)
          setLoading(false)
        })

      .catch((err) => console.error("AxiosError", err));
  }, []);

  return (
    <Container maxWidth="md">
       {loading ? ( 
         <Box
         sx={{
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           minHeight: "100vh",  
         }}
       >
        <CircularProgress />
        </Box>
      ) :
      reels.length === 0 ? 
      (
        <Typography>No reels from followed users.</Typography>
      ) : (
        <Grid container spacing={2}>
          {reels.map((reel) => (
            <Grid item xs={12} sm={12} md={12} key={reel._id}>
              <ReelCard reel={reel} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Reels;
