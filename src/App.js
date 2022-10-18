import React, { useState } from "react";
// access our api
import axios from "axios";
import rainy from "./assets/rainy.mp4";
import clearsky from "./assets/clearsky.mp4";
import cloudy from "./assets/cloudy.mp4";
import mist from "./assets/mist.mp4";
import overcast from "./assets/overcast.mp4";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fd381ddb7a2ba6bfbf705f6fd15bd5dd&units=metric`;

  const searchLocation = (event) => {
    // if event key is pressed
    if (event.key === "Enter") {
      //grab url
      axios.get(url).then((response) => {
        // setdata to response.data
        setData(response.data);
        console.log(response);
        // console log the data returned from axios.get
        console.log(response.data);
      });
      setLocation("");
      setData({});
    }
  };

  function capitalName(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  console.log(data.weather ? data.weather[0].description : null);
  console.log(location);

  const getSource = (description) => {
    switch (description) {
      case "few clouds":
        return cloudy;
      case "scattered clouds":
        return cloudy;
      case "broken":
        return cloudy;
      case "clear sky":
        return clearsky;
      case "overcast":
        return overcast;
      case "overcast clouds":
        return overcast;
      case "light rain":
        return rainy;
      case "light intensity shower rain":
        return rainy;
      case "mist":
        return mist;

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="app">
        {/* if data.weather is defined and getSource is defined, display <video> */}

        {data.weather && getSource(data.weather[0].description) && (
          <video autoPlay="autoplay" muted loop>
            <source src={getSource(data.weather[0].description)} type="video/mp4" />
          </video>
        )}

        <div className="search">
          <input
            type="text"
            value={location}
            // onchange occurs when value of the element has changed.
            // pass in event, set that to setLocation
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter location"
          ></input>
        </div>

        <div className="container">
          {/* if data.name does not equal to undefined, render this  */}
          {data.name !== undefined && (
            <div>
              <div className="top">
                <div className="location">
                  <h2>{data.name}</h2>
                </div>
                <div className="temp">{data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}</div>
                <div>{data.weather ? <p>{capitalName(data.weather[0].description)}</p> : null}</div>
                <div>
                  {data.main ? (
                    <p>
                      L:{data.main.temp_min.toFixed()}° H:{data.main.temp_max.toFixed()}°
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="bottom">
                <div className="feels">
                  <h6>Feels like</h6>
                  {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°</p> : null}
                </div>
                <div className="humidity">
                  <h6>Humidity</h6>
                  {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                </div>
                <div className="wind">
                  <h6>Wind(mph)</h6>
                  {data.wind ? <p className="bold">{data.wind.speed}</p> : null}
                </div>
                <div className="wind-direction">
                  <h6>Wind(direction)</h6>
                  {data.wind ? <p className="bold">{data.wind.deg}°</p> : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
