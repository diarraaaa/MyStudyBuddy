import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Home from './Home'
import { SignIn, SignUp } from './auth'

function App() {
  const [theme, setTheme] = useState('light')
  const [banner, setBanner] = useState('banner.png')

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",theme);
  },[theme])

  function changeTheme(){
    setTheme(theme==="light"?"dark":"light");
    setBanner(banner==="banner.png"?"bannerblack.png":"banner.png")
  }

  return (
    <>
      <Navbar theme={theme} changetheme={changeTheme}/>
      <Home banner={banner}/>
    </>
  )
}

export default App
