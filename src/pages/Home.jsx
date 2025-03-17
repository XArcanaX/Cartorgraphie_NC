import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });
    
    const cards = document.querySelectorAll(".preview-card");
    cards.forEach(card => observer.observe(card));
    
    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);
  
  return (
    <div>
      <Header />
      <header>
        <h1>Bienvenue sur l'interface dédiée à la cartographie des risques des cas de leptospirose en Nouvelle-Calédonie</h1>
        <p>Découvrez nos pages en cliquant sur les aperçus</p>
      </header>
      
      <main>
        <section className="preview-container">
          <Link to="/description_des_donnees" className="preview-card">
            <img src="/DescDonnées.png" alt="Description des Données" />
            <h3>Description des Données</h3>
          </Link>
          <Link to="/predictions_des_cas" className="preview-card">
            <img src="/PredCas.png" alt="Prédiction des Cas" />
            <h3>Prédiction des Cas</h3>
          </Link>
          <Link to="/apropos" className="preview-card">
            <img src="/site3_preview.jpg" alt="À propos" />
            <h3>À propos</h3>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;