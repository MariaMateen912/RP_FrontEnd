import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Paper, Typography, Button, Box } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const slides = [
  {
    image: 'https://as2.ftcdn.net/v2/jpg/04/00/58/39/1000_F_400583904_SIrBCqQEn077ZHSK06r2jvrrTT9ua9ut.jpg',
  },
  {
    image: 'https://as2.ftcdn.net/v2/jpg/04/63/73/11/1000_F_463731155_Cy2zrISuGv35v9PJvvi12gML7vKoCcSZ.jpg',
  },
  {
    image: 'https://as1.ftcdn.net/v2/jpg/03/26/96/08/1000_F_326960863_H6rldtPxBudJAeYsBvhWEQK3l0OwWOLe.jpg',
  },
];

const Carousel = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + slides.length) % slides.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      handleBack();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: 'auto',
        position: 'relative',
      }}
    >
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={(index) => setActiveStep(index)}
      >
        {slides.map((slide, index) => (
          <Paper
            key={index}
            sx={{
              padding: 2,
              minHeight: 400,
              color: '#fff',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            elevation={4}
          >
            <Typography variant="h4">{slide.label}</Typography>
            <Typography variant="body1">{slide.description}</Typography>
          </Paper>
        ))}
      </AutoPlaySwipeableViews>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          transform: 'translateY(-50%)',
        }}
      >
        <Button
          sx={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
          }}
          onClick={handleBack}
        >
          Previous
        </Button>
        <Button
          sx={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
          }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Carousel;
