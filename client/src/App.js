import React from "react";
import './styles/app.scss';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
       <AppRouter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
