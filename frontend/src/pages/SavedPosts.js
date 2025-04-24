import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/Postcard";
import ReelCard from "../components/ReelCard"
import { useSelector } from "react-redux";

const SavedPostsPage = () => {
  const userId = useSelector((state) => state.user.details._id);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/revonn/savedposts/${userId}`);
        console.log(res.data);  // Log the response to check the structure
        setSavedPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch saved posts:", error);
      }
    };
  
    if (userId) fetchSavedPosts();
  }, [userId]);
  
  

  return (
    <div>
    {savedPosts.length === 0 ? (
      <p>No saved posts yet.</p>
    ) : (
      savedPosts.map((post, index) => {
        const style = {
          paddingTop: index === 0 ? "50px" : undefined,
          paddingBottom: index === savedPosts.length - 1 ? "50px" : undefined,
        };
  
        return post.contentType === "reel" ? (
          <div key={post._id} style={style}>
            <ReelCard post={post} />
          </div>
        ) : (
          <div key={post._id} style={style}>
            <PostCard post={post} />
          </div>
        );
      })
    )}
  </div>
  
  );
};

export default SavedPostsPage;
