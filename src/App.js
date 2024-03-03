import React from "react";
import Header from "./header";
import WeatherForm from "./weatherform";
import "./styles.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <WeatherForm />
    </div>
  );
}

export default App;
