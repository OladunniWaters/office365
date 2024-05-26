import { useState } from 'react';
import Outlook from './component/outlook/Outlook';
import Form from './component/outlook/Form';
import './App.css';

import {BrowserRouter as HashRouter, Routes, Route} from "react-router-dom";

function App() {
      const [theme, setTheme] = useState("dark")
    const changeTheme = () =>{
    theme === "dark" ? setTheme("light") : setTheme("dark")
  }


  return (
    <>
     <div className="app" data-theme={theme}>
        <HashRouter>
           <Routes>
               <Route exact path="/" element={<Outlook />} />
          </Routes>
        </HashRouter>
     </div>  
    </>
  )
}

export default App
