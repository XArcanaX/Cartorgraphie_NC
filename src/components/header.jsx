import  React from 'react'
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = ({ showSourceSelector = false, title = null }) => {
    return (
        <header>
            <section>
                <ThemeToggle />
                <nav>
                    <Link className="nav-link" to="/">Accueil</Link>
                    <Link className="nav-link" to="/DataDescription">Description des cas</Link>
                    <Link className="nav-link" to="/Predictions">Prédiction des cas</Link>
                    <Link className="nav-link" to="/About">À propos</Link>
                </nav>

                {showSourceSelector && (
                    <div id="menu1">
                        <div className="menu-source1">
                        <select id="source-select1">
                            <option value="georep.nc">Georep.nc</option>
                            <option value="oeil.nc">Oeil.nc</option>
                            <option value="source3">Source 3</option>
                        </select>
                        </div>
                        
                        <div className="menu-fichier1">
                        <select id="gpkg-select">
                            <option>Une option</option>
                        </select>
                        </div>
                    </div>
                )}
                {title && <h2>{title}</h2>}
            </section>

        </header>
    );
};

export default Header;