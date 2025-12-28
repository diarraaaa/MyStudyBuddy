import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';   
import {supabase} from '../supabase';
import './auth.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate=useNavigate();
    const handleSignin = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        }); 
        console.log(data.session);
        if (error) {  
            setMessage(`Error: ${error.message}`);
        } else {
            navigate('/profile');
            setMessage('Signin successful! Welcome back.');
        }
    }
    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSignin} >
                <h1>Connexion</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Mot de passe:</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Se connecter</button>
                {message && <p className="message">{message}</p>}
                <p>Pas encore de compte?{" "}
                    <Link to="/signup" style={{ color: "#007bff" }}>S'inscrire</Link>
                </p>
            </form>
        </div>
    );
}
export default SignIn;