import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  console.log("location=>", location);

  const apiKey = process.env.REACT_APP_API_KEY
console.log(apiKey);
//  const apiname=process.env.REACT_APP_NAME
//  console.log(apiname);
 

  // const apiKey='949cb35c4551f63e6c9115f0dd0f7a26'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;

  const searchLocation = async (event) => {
    console.log("Event triggered:", event);  // Check if the function is called
    if (event.key === 'Enter' && location) {
      console.log("Enter key pressed with location:", location);  // Check if condition is met
      try {
        const response = await axios.get(url);
        console.log("API response:", response.data);  // Log the API response
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the weather data:", error);  // Log any errors
      }
      setLocation('');
    }
  };

  return ( 
    <div className="app">
      <div className='search'>
        <input
          type='text'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{((data.main.temp - 32) * 5 / 9).toFixed(2)}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>


        {data.name !== undefined &&
          <div className='bottom'>
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
