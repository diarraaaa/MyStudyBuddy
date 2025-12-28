import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function AuthCallback() {
  const [message, setMessage] = useState('Confirmation de votre email en cours...');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Récupérer le hash de l'URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          // Définir la session
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;

          setMessage('✅ Email confirmé ! Redirection en cours...');
          setTimeout(() => navigate('/profile'), 2000);
        } else {
          setMessage('❌ Lien de confirmation invalide');
        }
      } catch (error) {
        console.error('Erreur lors de la confirmation du email :', error);
        setMessage('❌ Erreur lors de la confirmation du email. Veuillez réessayer.');
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