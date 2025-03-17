import React, { useState, useEffect, useRef } from 'react';

const MonthSlider = ({ onChange }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);
  
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const updateDate = (value) => {
    const currentYear = 2021 + Math.floor(value / 12);
    const currentMonth = months[value % 12];
    return `${currentMonth} ${currentYear}`;
  };
  
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  
  const slide = () => {
    if (sliderValue < 23) {
      const newValue = sliderValue + 1;
      setSliderValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    } else {
      togglePlayPause(false);
    }
  };
  
  const togglePlayPause = (state) => {
    setIsPlaying(state);
    if (state) {
      intervalRef.current = setInterval(slide, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };
  
  return (
    <div className="slider-container">
      <input
        type="range"
        id="monthSlider"
        min="0"
        max="23"
        value={sliderValue}
        step="1"
        onChange={handleSliderChange}
      />
      <div className="value-display" id="dateDisplay">
        {updateDate(sliderValue)}
      </div>
      
      {!isPlaying ? (
        <button id="playButton" onClick={() => togglePlayPause(true)}>
          Play
        </button>
      ) : (
        <button id="pauseButton" onClick={() => togglePlayPause(false)}>
          Pause
        </button>
      )}
    </div>
  );
};

export default MonthSlider;