import React from 'react';
import './App.css';
import RegisterComponent from "./Components/RegisterComponent";
import LoginComponent from "./Components/LoginComponent";
import ChatsComponent from "./Components/ChatsComponent";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>

        <Routes>
          <Route path={"/register"} element={<RegisterComponent/>}/>
          <Route path={"/login"} element={<LoginComponent/>}/>
          <Route path={"/chats"} element={<ChatsComponent/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
