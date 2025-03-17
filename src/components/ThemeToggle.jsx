import React, { useEffect, useState} from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(()=> {
        const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(darkModeEnabled);
        if(darkModeEnabled) {
            document.body.classList.add('dark-mode');
        
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', newDarkMode);
    };

    return(
        <div id="toggle-btn">
            <input
            type="checkbox"
            id="checkboxInput"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            aria-label="Bascule du mode sombre/claire"
            />
            <label htmlFor="checkboxInput" className="ToggleSwitch"></label>
        </div>
    );
};

export default ThemeToggle;