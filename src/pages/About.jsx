import React from 'react';
import Header from './components/Header';

const About = () => {
  return (
    <div>
      <Header title="À propos" />
      
      <main>
        <section className="about-content">
          <h1>À propos de ce projet</h1>
          <p>Cette application web permet de visualiser les risques des cas de leptospirose en Nouvelle-Calédonie.</p>
          
          <h2>La leptospirose en Nouvelle-Calédonie</h2>
          <p>La leptospirose est une maladie infectieuse causée par des bactéries appelées leptospires. En Nouvelle-Calédonie, 
             cette maladie représente un problème de santé publique important en raison des conditions climatiques favorables 
             à la survie et à la propagation des leptospires.</p>
          
          <h2>Notre mission</h2>
          <p>Cette application a pour objectif de fournir des outils de visualisation et de prédiction des cas de leptospirose 
             afin d'aider les professionnels de santé et les autorités locales à mettre en place des mesures préventives efficaces.</p>
          
          <h2>Sources de données</h2>
          <p>Les données utilisées dans cette application proviennent de plusieurs sources, notamment:</p>
          <ul>
            <li>Georep.nc - Plateforme d'informations géographiques de Nouvelle-Calédonie</li>
            <li>Oeil.nc - Observatoire de l'environnement en Nouvelle-Calédonie</li>
            <li>DASS-NC - Direction des Affaires Sanitaires et Sociales de Nouvelle-Calédonie</li>
          </ul>
          
          <h2>Contact</h2>
          <p>Pour plus d'informations sur ce projet, n'hésitez pas à nous contacter à l'adresse: contact@leptospirose-nc.org</p>
        </section>
      </main>
    </div>
  );
};

export default About;