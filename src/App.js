import React from "react";
import "./weather"
import WeatherForm from "./weatherform";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <div className="container">
      <WeatherForm />

      <footer>
        This project is coded by Alexa Cacchiola and is {" "}
        <a
          href="https://github.com/codergirlshecodes/React-App"
          target="_blank"
          rel="noopener noreferrer" 
        >
          open-sourced on Github

        </a>
      </footer>
      </div>
    </div>
  );
}

export default App;
