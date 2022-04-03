import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes";
import './styles/app.scss';

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
