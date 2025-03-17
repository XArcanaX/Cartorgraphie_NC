import React, { useState } from 'react';
import Header from '../components/Header';
import MapComponent from '../components/Map';
import MonthSlider from '../components/MonthSlider';
import InfoPanel from '../components/InfoPanel';

const Predictions = () => {
  const [monthIndex, setMonthIndex] = useState(0);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  
  const handleMonthChange = (value) => {
    setMonthIndex(value);
  };
  
  const handleFeatureSelect = (communeName) => {
    setSelectedCommune(communeName);
  };
  
  const getCurrentMonth = () => months[monthIndex % 12];
  const getCurrentYear = () => 2021 + Math.floor(monthIndex / 12);
  
  return (
    <div>
      <Header title="Prédictions des cas" />
      
      <main>
        <section id="blocks">
          <div className="map-info-container">
            <MapComponent 
              monthIndex={monthIndex} 
              onFeatureSelect={handleFeatureSelect} 
            />
            <div className="info-stats-container">
              <InfoPanel 
                communeName={selectedCommune} 
                month={getCurrentMonth()} 
                year={getCurrentYear()} 
              />
              
              <div className="stats-container">
                <div id="stat1"></div>
                <div id="stat2"></div>
              </div>
            </div>
          </div>
        </section>
    
        <div className="Slider-container">
          <MonthSlider onChange={handleMonthChange} />
        </div>
      </main>
    </div>
  );
};

export default Predictions;