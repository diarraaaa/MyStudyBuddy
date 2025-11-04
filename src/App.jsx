import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar'
import {Section1,Section2 }from './Sections'

function App() {
  return (
    <>
      <Navbar/>
      <Section1/>
      <Section2/>
    </>
  )
}

export default App
