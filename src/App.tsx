import React from 'react';
import './App.css';
import RegisterComponent from "./Components/RegisterComponent";
import LoginComponent from "./Components/LoginComponent";
import ChatsComponent from "./Components/ChatsComponent";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ApolloAppProvider from "./graphql";
import MessagesComponent from "./Components/MessagesComponent";

function App() {
  return (
      <ApolloAppProvider>
        <BrowserRouter>
            <Routes>
                <Route path={"/register"} element={<RegisterComponent/>}/>
                <Route path={"/login"} element={<LoginComponent/>}/>
                <Route path={"/chats"} element={<ChatsComponent/>}/>
                <Route path={"/chat/:id"} element={<MessagesComponent/>}/>
            </Routes>
        </BrowserRouter>
      </ApolloAppProvider>
  );
}

export default App;
