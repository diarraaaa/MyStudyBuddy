import {Section1,Section2,Section3,Section4,Footer}from './Sections'
import React from 'react';

function Home({banner}) {
    return (
        <>
          <Section1 banner={banner}/>
          <Section2/>
          <Section3/>
          <Section4/>
          <Footer/>
        </>
    )  
}
export default Home;