import React from 'react';
import {Route, Routes} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import AdminPage from "./Containers/AdminPage/AdminPage";
import HomePage from "./Containers/HomePage/HomePage";
import ContentPage from "./Containers/ContentPage/ContentPage";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={(<HomePage/>)}/>
        <Route path='/pages/:pageName' element={(<ContentPage/>)}/>
        <Route path='/pages/admin' element={<AdminPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
