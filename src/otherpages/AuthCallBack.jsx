import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function AuthCallback() {
  const [message, setMessage] = useState('Confirming your email...');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Get the hash from URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          // Set the session
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;

          setMessage('✅ Email confirmed! Redirecting...');
          setTimeout(() => navigate('/profile'), 2000);
        } else {
          setMessage('❌ Invalid confirmation link');
        }
      } catch (error) {
        console.error('Error confirming email:', error);
        setMessage('❌ Error confirming email. Please try again.');
      }
    };

    confirmEmail();
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>{message}</h2>
    </div>
  );
}

export default AuthCallback;