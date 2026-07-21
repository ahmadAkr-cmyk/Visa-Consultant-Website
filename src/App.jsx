import React from 'react'
import { Outlet } from "react-router-dom";
import Nav from './Components/Basics/Nav'
import Footer from './Components/Footer';

const App = () => {
  return (
    <>
     
     <Nav/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
