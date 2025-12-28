import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {supabase} from '../supabase';
import './auth.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSignup = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
            },
        });
        console.log("Signup data:", data);
        console.log("Signup error:", error);
        if (error) {
            setMessage(`Error: ${error.message}`);
        }else if (!('email_verified' in data.user.user_metadata)) {
            setMessage('Cette adresse email est déjà utilisée. Veuillez essayer de vous connecter.');
        }else {
            setMessage('Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.');
        }
    };
    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup} >
                <h1>S'inscrire</h1>
                <label htmlFor="username">Nom d'utilisateur:</label>
                <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Mot de passe:</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">S'inscrire</button>
                {message && <p className="message">{message}</p>}
                <p>Deja inscrit ?
                    <Link to="/signin" style={{ color: "#007bff" }}>Se connecter</Link>
                </p>
            </form>
        </div>
    );
}
export default SignUp;