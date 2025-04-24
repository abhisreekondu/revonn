import React, { useEffect } from "react";
import "./App.css"
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import Tab from "./components/Tab";
import { fetchSingleUser } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Box, Typography, Hidden } from "@mui/material";
import UploadReel from "./pages/UploadReel";
import UploadPost from "./pages/UploadPost";
import { Routes,Route} from "react-router-dom";
import Profile from "./pages/Profile";
import AllUsersPage from "./pages/Allusers";
import UserSettings from "./pages/UserSettings";
import SavedPostsPage from "./pages/SavedPosts";
const App = () => {
  const dispatch = useDispatch();

  const { loading, error, details: user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchSingleUser());
  }, [dispatch]);

  // Show loading while user is being fetched
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show error if fetching fails
  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Failed to load user: {error}
        </Typography>
      </Box>
    );
  }

 
  if (!user) return null;


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}
    >
       <Header /> {/*Fixed at the top*/} 
      

      {/* Main content takes the available vertical space and scrolls if needed */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
           <Route path="/" element={<Tab />} /> 
          <Route path="/upload-post" element={<UploadPost />} />
          <Route path="/upload-reel" element={<UploadReel />} />
          <Route path="/allusers" element={<AllUsersPage/>}/> 
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/settings" element={<UserSettings />} />
         <Route path="/saved" element={<SavedPostsPage/>}/>

        </Routes>
      </Box>
  
      <BottomNav /> 
    </Box>
  );
  
};

export default App;
