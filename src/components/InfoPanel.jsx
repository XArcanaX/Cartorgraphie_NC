import React, { useState } from 'react';
import { fetchCommuneData } from '../services/api';

const InfoPanel = ({ communeName, month, year }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  React.useEffect(() => {
    if (communeName) {
      setLoading(true);
      setError(null);
      
      fetchCommuneData(communeName, month, year)
        .then(response => {
          setData(response);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message || 'Une erreur est survenue');
          setLoading(false);
        });
    }
  }, [communeName, month, year]);
  
  return (
    <div id="info">
      {!communeName && !loading && !data && !error && (
        <p id="loadingText">Cliquez sur un polygone pour afficher ses informations.</p>
      )}
      
      {loading && (
        <div className="loading-spinner" id="loadingSpinner"></div>
      )}
      
      {error && (
        <p id="loadingText"><strong>Erreur :</strong> {error}</p>
      )}
      
      {data && (
        <div id="dataContent" className="data-content">
          <p><strong>Commune :</strong> {data.commune}</p>
          <p><strong>Population :</strong> {data.population}</p>
          <p><strong>Superficie :</strong> {data.superficie} km²</p>
          <p><strong>Année :</strong> {data.annee}</p>
          <p><strong>Mois :</strong> {data.mois}</p>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;