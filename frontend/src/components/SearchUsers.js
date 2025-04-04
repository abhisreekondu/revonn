import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Box,
  List,
  ListItem,
  Typography,
  Paper,
  ClickAwayListener,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const navigate = useNavigate(); 

  // Handle outside clicks to close suggestions
  const handleClickAway = () => {
    setShowSuggestions(false);
  };

  // Fetch suggestions
  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/revonn/users/search?query=${value}&limit=1`
      );
      setSuggestions(res.data);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (username) => {
    console.log("Selected user:", username);
    setSearchQuery(username);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSeeAll = () => {
    console.log("Navigate to /allusers");
    navigate(`/allusers?query=${searchQuery}&limit=10`);
    setShowSuggestions(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ width: 300, margin: 'auto', position: 'relative' }}>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          inputRef={inputRef}
          autoComplete="off"
        />

        {showSuggestions && suggestions.length > 0 && (
          <Paper
            sx={{
              position: 'absolute',
              width: '100%',
              top: '100%',
              left: 0,
              zIndex: 10,
              maxHeight: 200,
              overflowY: 'auto',
            }}
            elevation={3}
          >
            <List dense>
              {suggestions.map((user) => (
                <ListItem
                  button
                  key={user._id}
                  onClick={() => handleSelectUser(user.username)}
                >
                  <Typography>{user.username}</Typography>
                </ListItem>
              ))}

              <ListItem button onClick={handleSeeAll}>
                <Typography color="primary">See All</Typography>
              </ListItem>
            </List>
          </Paper>
        )}

        {!loading && suggestions.length === 0 && searchQuery.trim() && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            No users found
          </Typography>
        )}
        {loading && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Loading...
          </Typography>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchUsers;
