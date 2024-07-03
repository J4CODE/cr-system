/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-4">
      <Button
        sx={{
          backgroundColor: '#ebfd00',
          color: 'black',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'green',
            color: 'white'
          },
        }}
        variant="contained"
        onClick={() => navigate('/dashboard')}
      >
        Return to Dashboard
      </Button>
      <Button
        sx={{
          backgroundColor: '#ebfd00',
          color: 'black',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'green',
            color: 'white'
          },
        }}
        variant="contained"
        onClick={() => navigate(-1)}
      >
        Back to Previous Page
      </Button>
    </div>
  );
};

export default NavigationButtons;
