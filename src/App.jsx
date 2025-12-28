import { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Home from './homepage/Home'
import SignUp from './auth/signup'
import SignIn from './auth/signin'
import Profile from './profile/profile'
import Try from './otherpages/try'
import AuthCallback from './otherpages/AuthCallBack'


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
  const navigate = useNavigate();

  useEffect(() => {
    // Handle email confirmation
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session);
          navigate('/profile');
        }
        
        if (event === 'USER_UPDATED') {
          console.log('User updated:', session);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <Router>
      <Navbar theme={theme} changetheme={changeTheme}/>
      <Routes>
        <Route path="/" element={<Home banner={banner}/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/try" element={<Try/>}/>
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  )
}

export default App
