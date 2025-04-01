import React, { useState } from 'react';
import { TextField, Box, List, ListItem, Typography } from '@mui/material';
import axios from 'axios';

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value.length === 0) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:5000/revonn/users/search?query=${value}&limit=5`)
      .then((res) => {
        setSuggestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  const handleSelectUser = (username) => {
    
  };

  const handleSeeAll = () => {
   
  };

  return (
    <Box sx={{ width: 300, margin: 'auto', position: 'relative' }}>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        disabled={loading}
      />

      {loading && <Typography variant="body2">Loading...</Typography>}

      {suggestions.length > 0 && (
        <List sx={{ position: 'absolute', width: '100%', bgcolor: 'background.paper', zIndex: 10, boxShadow: 2 }}>
          {suggestions.map((user) => (
            <ListItem button key={user._id} onClick={() => handleSelectUser(user.username)}>
              <Typography variant="body1">{user.username}</Typography>
            </ListItem>
          ))}

          <ListItem button onClick={handleSeeAll}>
            <Typography variant="body1" color="primary">See All</Typography>
          </ListItem>
        </List>
      )}

      {suggestions.length === 0 && searchQuery && !loading && (
        <Typography variant="body2">No users found</Typography>
      )}
    </Box>
  );
};

export default SearchUsers;
