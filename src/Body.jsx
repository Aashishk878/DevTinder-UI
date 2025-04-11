import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Body = () => {
  return (
    <div>
      <NavBar />

      <Outlet />  {/*all the children routes of body will be rendered here*/}

      <Footer />

    </div>
  )
}

export default Body;
