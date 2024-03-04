import React from "react";
import Header from "./header";
import WeatherForm from "./weatherform";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Header />
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
  );
}

export default App;
