import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, List, ListItem, Typography, Button ,CircularProgress} from '@mui/material';

const AllUsersPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const limit = parseInt(searchParams.get("limit")) || 10;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/revonn/users/search?query=${query}&limit=${limit}`
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query, limit]);

  const handleViewProfile = (user) => {
    navigate(`/profile/${user._id}`);
  };

  if (loading) return  <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <CircularProgress size={50} />
          </Box>;

  return (
    <Box sx={{ p: 2 }}>
      {users.length === 0 ? (
        <Typography  sx={{paddingTop:'50px'}}>No users found</Typography>
      ) : (
        <List sx={{paddingTop:'50px'}} >
          {users.map((user) => (
            <ListItem
              key={user._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ddd',
                py: 1,
                
              }}
            >
              <Typography variant="body1">{user.username}</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleViewProfile(user)}
              >
                View Profile
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AllUsersPage;
