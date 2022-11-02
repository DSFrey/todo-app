import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Footer} from '@mantine/core'
import ToDo from './Components/ToDo';
import { AppNavbar } from './Components/Navbar';
import { Settings } from './Components/Settings';


export const App = () => {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route
          exact path='/'
          element={<ToDo />}
        />
        <Route
          exact path='/settings'
          element={<Settings />}
        />
      </Routes>
      <Footer>&copy; 2022 Code Fellows / Daniel Frey</Footer>
    </BrowserRouter>
  );
}
