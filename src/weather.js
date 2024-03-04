import React from "react";
import "./weather.css";



export default function weather() {
    return (
      <div className="Weather">
        <h1>Tampa</h1>
        <ul>
          <li>
            Friday 02:00
          </li>
          <li>
            Sunny
          </li>
        </ul>
        <div className="row">
            <div className="col-6">
               <img src="https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png" alt="clear" />
               25°C
            </div>
            <div className="col-6">
               <ul>
                <li>Precipitation:15%</li>
                <li>Humidity: 72%</li>
                <li>Wind: 13km/h%</li>
                </ul> 
            </div>
        </div>
      </div>
    );
  }