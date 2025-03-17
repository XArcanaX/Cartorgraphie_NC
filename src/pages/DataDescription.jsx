import React, { useState } from 'react';
import Header from './components/Header';
import MapComponent from '../components/Map';
import MonthSlider from '../components/MonthSlider';
import InfoPanel from '../components/InfoPanel';

const DataDescription = () => {
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
      <Header showSourceSelector={true} />
      
      <main>
        <section id="blocks">
          <div className="map-info-container">
            <MapComponent 
              monthIndex={monthIndex} 
              onFeatureSelect={handleFeatureSelect} 
            />
            <InfoPanel 
              communeName={selectedCommune} 
              month={getCurrentMonth()} 
              year={getCurrentYear()} 
            />
          </div>
        </section>
    
        <MonthSlider onChange={handleMonthChange} />
      </main>
    </div>
  );
};

export default DataDescription;