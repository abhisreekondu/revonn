import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography ,Box,CircularProgress} from '@mui/material';
import ReelCard from '../components/ReelCard';
import { useSelector } from "react-redux";
const Reels = () => {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(true);

  const user = useSelector((state) => state.user.details);
  const userId = user?._id;
  useEffect(() => {
    if (!userId) {
      console.log("User ID not available yet. Skipping API call.");
      return;
    }
    console.log(`Making API call to fetch reels for userId: ${userId}`);
    axios.get(`http://localhost:5000/revonn/followingcontent/${userId}?type=reel`)
      .then((res) =>
        { setPosts(res.data)
          setLoading(false)
        })

      .catch((err) => 
        {console.error("AxiosError", err)
          setLoading(false);

        }
    );
  }, [userId]);
  console.log("Reels received from backend:", posts);
  return (
    <Container maxWidth={false} sx={{ pt: '89px' ,paddingBottom: '50px'}}>

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
      posts.length === 0 ? 
      (
        <Typography  align="center">No reels from followed users.</Typography>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
  <Grid item xs={12} sm={8} md={4} key={post._id}>
    <ReelCard post={post} /> 
  </Grid>
))}

        </Grid>
      )}
    </Container>
  );
};

export default Reels;
