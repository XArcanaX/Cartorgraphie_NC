import React, { useEffect, useRef,  useCallback, useMemo } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { Style, Fill, Stroke } from 'ol/style';

const MapComponent = ({ monthIndex, onFeatureSelect }) => {
  const mapRef = useRef();
  const mapInstance = useRef(null);
  const vectorSourceRef = useRef(null);
  const selectedFeatureRef = useRef(null);

  // Utilisation de useMemo pour stocker les couleurs et éviter de les recalculer à chaque rendu
  const monthColors = useMemo(() => [
    'rgba(144, 12, 63, 0.6)', 'rgba(255, 165, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
    'rgba(0, 255, 0, 0.6)', 'rgba(0, 128, 255, 0.6)', 'rgba(0, 0, 255, 0.6)',
    'rgba(75, 0, 130, 0.6)', 'rgba(238, 130, 238, 0.6)', 'rgba(255, 105, 180, 0.6)',
    'rgba(128, 128, 128, 0.6)', 'rgba(255, 69, 0, 0.6)', 'rgba(0, 0, 0, 0.6)'
  ], []);

  // Fonction de mise à jour des styles
  const updatePolygonStyles = useCallback((monthIdx) => {
    if (!vectorSourceRef.current) return;
    const color = monthColors[monthIdx];

    vectorSourceRef.current.getFeatures().forEach(feature => {
      if (feature !== selectedFeatureRef.current) {
        feature.setStyle(new Style({
          fill: new Fill({ color: color }),
          stroke: new Stroke({ color: '#000000', width: 1 })
        }));
      }
    });
  }, [monthColors]);

  // Gestion du clic sur la carte
  const handleMapClick = useCallback((evt) => {
    if (!mapInstance.current) return;
    const feature = mapInstance.current.forEachFeatureAtPixel(evt.pixel, f => f);
    const monthIdx = monthIndex % 12;

    if (feature) {
      if (selectedFeatureRef.current && selectedFeatureRef.current !== feature) {
        selectedFeatureRef.current.setStyle(new Style({
          fill: new Fill({ color: monthColors[monthIdx] }),
          stroke: new Stroke({ color: '#000000', width: 1 })
        }));
      }

      selectedFeatureRef.current = feature;
      feature.setStyle(new Style({
        fill: new Fill({ color: 'rgba(255, 0, 0, 0.8)' }),
        stroke: new Stroke({ color: '#FF0000', width: 3 })
      }));

      if (onFeatureSelect) {
        const communeName = feature.get('nom');
        onFeatureSelect(communeName);
      }
    }
  }, [monthIndex, onFeatureSelect, monthColors]);

  // Initialisation de la carte
  useEffect(() => {
    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const vectorLayer = new VectorLayer({ source: vectorSource });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=piEQUHr3iAT5hZmZJTqv',
            attributions: '© MapTiler © OpenStreetMap contributors'
          })
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([166.08, -21.313]),
        zoom: 7.5
      })
    });

    mapInstance.current = map;
    map.on('singleclick', handleMapClick);

    // Chargement du GeoJSON
    fetch('/Limites_administratives_terrestres.geojson')
      .then(response => response.json())
      .then(data => {
        const features = new GeoJSON().readFeatures(data, { featureProjection: 'EPSG:3857' });
        vectorSource.addFeatures(features);
        updatePolygonStyles(monthIndex % 12);
      })
      .catch(error => console.error('Erreur lors du chargement du GeoJSON:', error));

    return () => {
      map.setTarget(null);
      map.un('singleclick', handleMapClick);
    };
  }, [handleMapClick, updatePolygonStyles, monthIndex]);

  // Mise à jour du style quand le mois change
  useEffect(() => {
    updatePolygonStyles(monthIndex % 12);
  }, [monthIndex, updatePolygonStyles]);

  return <div id="map" ref={mapRef} style={{ height: '70vh', width: '90vw' }}></div>;
};

export default MapComponent;
