import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WeatherDashboard from './Components/WeatherDashboard'; // Correct import path

function App() {
  const [currentWeatherCondition, setCurrentWeatherCondition] = useState('clear');
  const [loadingApp, setLoadingApp] = useState(true);
  const [errorApp, setErrorApp] = useState(null);
  const [appLocation, setAppLocation] = useState('Mumbai'); // Default city for background

  const getWeatherBackgroundClass = (description) => {
    if (!description) return 'bg-clear';
    const lowerDescription = description.toLowerCase();
    if (lowerDescription.includes('clear') || lowerDescription.includes('sun')) return 'bg-clear';
    if (lowerDescription.includes('cloud') || lowerDescription.includes('overcast')) return 'bg-clouds';
    if (lowerDescription.includes('rain') || lowerDescription.includes('drizzle')) return 'bg-rain';
    if (lowerDescription.includes('snow') || lowerDescription.includes('sleet')) return 'bg-snow';
    if (lowerDescription.includes('storm') || lowerDescription.includes('thunder')) return 'bg-storm';
    if (lowerDescription.includes('fog') || lowerDescription.includes('mist')) return 'bg-fog';
    return 'bg-clear';
  };

  useEffect(() => {
    const fetchInitialWeatherForBackground = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/weather/current?location=${appLocation}`);
        const description = response.data.weather[0].description;
        setCurrentWeatherCondition(getWeatherBackgroundClass(description));
      } catch (err) {
        console.error("Error fetching initial weather for background:", err);
        setErrorApp("Failed to load app background.");
        setCurrentWeatherCondition('bg-clear');
      } finally {
        setLoadingApp(false);
      }
    };
    fetchInitialWeatherForBackground();
  }, [appLocation]);

  if (loadingApp) {
    return <div className="app-loading flex items-center justify-center h-screen w-screen bg-gray-900 text-white">Loading app...</div>;
  }

  if (errorApp) {
    return <div className="app-error flex items-center justify-center h-screen w-screen bg-red-900 text-white">{errorApp}</div>;
  }

  return (
    <div className={`App ${currentWeatherCondition}`}>
      <WeatherDashboard setAppLocation={setAppLocation} /> {/* Render WeatherDashboard */}
    </div>
  );
}

export default App;