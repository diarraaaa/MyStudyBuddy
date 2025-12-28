import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import './profile.css';
import ReactMarkdown from 'react-markdown';
import { summarizeText, reformulateText, generateArticles, explainText } from '../services/groq';

function Profile() {
    const [user, setUser] = useState(null);
    const [inputType, setInputType] = useState('file'); 
    const [summary, setSummary] = useState('');
    const [reformulatedtext, setReformulatedtext] = useState('');
    const [explanation, setExplanation] = useState('');
    const [articles, setArticles] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasktodo, setTasktodo] = useState('');
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (!user) {
                navigate('/');
            }
        };
        fetchUser();
    }, [navigate]);

    const generatematerial = async () => {
        try {
            setLoading(true);
            setError(null);
            
            if (inputType === 'text') {
                const texttouse = document.getElementById('content-text').value;
                const selectedTask = document.querySelector('input[name="generation-type"]:checked')?.value;
                
                if (!texttouse.trim()) {
                    setError('Veuillez entrer du texte pour générer du matériel.');
                    return;
                }
                
                if (!selectedTask) {
                    setError('Veuillez sélectionner un type de génération.');
                    return;
                }

                // Réinitialiser tous les états
                setSummary(null);
                setReformulatedtext(null);
                setExplanation(null);
                setArticles(null);

                if (selectedTask === 'summary') {
                    const result = await summarizeText(texttouse);
                    setSummary(result);
                    setTasktodo('Résumé');
                } else if (selectedTask === 'reformulate') {
                    const result = await reformulateText(texttouse);
                    setReformulatedtext(result);
                    setTasktodo('Reformulation');
                } else if (selectedTask === 'explanation') {
                    const result = await explainText(texttouse);
                    setExplanation(result);
                    setTasktodo('Explication');
                } else if (selectedTask === 'articles') {
                    const result = await generateArticles(texttouse);
                    setArticles(result);
                    setTasktodo('Recommandations d\'articles');
                }
            }
        } catch (error) { 
            console.error("Erreur lors de la génération du matériel d'étude:", error);
            setError('Erreur lors de la génération du matériel d\'étude. Veuillez réessayer.');
        } finally {
            setLoading(false);
            console.log("Tâche terminée");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Mon Assistant d'Étude</h1>
                <h2>Bonjour {user ? user.user_metadata.username : 'Invité'}!</h2>
                <p>Générez des résumés, des quiz et des fiches de votre contenu</p>
            </div>

            <div className="profile-content">
                <section className="profile-section">
                    <h2>Créer un Support d'Étude</h2>
                    
                    <div className="input-type-selector">
                        <button 
                            className={`type-btn ${inputType === 'file' ? 'active' : ''}`}
                            onClick={() => setInputType('file')}
                        >
                            📁 Importer un fichier
                        </button>
                        <button 
                            className={`type-btn ${inputType === 'text' ? 'active' : ''}`}
                            onClick={() => setInputType('text')}
                        >
                            ✏️ Coller du texte
                        </button>
                    </div>

                    <div className="upload-form">
                        <div className="form-group">
                            <label htmlFor="content-title">Titre:</label>
                            <input 
                                type="text" 
                                id="content-title"
                                placeholder="Entrez un titre pour votre matériel d'étude"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>
                        
                        {inputType === 'file' ? (
                            <div className="form-group">
                                <label htmlFor="content-file">Importer un fichier:</label>
                                <input 
                                    type="file" 
                                    id="content-file"
                                    accept=".pdf,.doc,.docx,.txt"
                                />
                                <small className="helper-text">Formats supportés: PDF, DOC, DOCX, TXT</small>
                            </div>
                        ) : (
                            <div className="form-group">
                                <label htmlFor="content-text">Collez votre texte:</label>
                                <textarea 
                                    id="content-text"
                                    rows="8"
                                    placeholder="Collez votre contenu de cours, vos notes ou tout texte que vous souhaitez étudier..."
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Générer:</label>
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="explanation" />
                                    <span>📖 Explication</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="summary" defaultChecked />
                                    <span>📝 Résumé</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="quiz" />
                                    <span>❓ Quiz</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="flashcards" />
                                    <span>🎴 Fiches</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="video" />
                                    <span>🎥 Recommandations de vidéos</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="articles" />
                                    <span>📄 Recommandations d'articles</span>
                                </label>
                            </div>
                        </div>
                        <button className="btn-primary" onClick={generatematerial}>
                            Générer un Support d'Étude
                        </button>
                    </div>
                </section>
                <section className="profile-section">
                    <h2>Supports d'Étude Générés: {tasktodo && <span>{tasktodo}</span>}</h2>
                    <div className="materials-list">
                        {title && <h2>{title}</h2>}
                        {loading && <p style={{ color: 'blue' }}>Génération du support en cours...</p>}    
                        {summary && <ReactMarkdown>{summary}</ReactMarkdown>}
                        {reformulatedtext && <ReactMarkdown>{reformulatedtext}</ReactMarkdown>}
                        {explanation && <ReactMarkdown>{explanation}</ReactMarkdown>}
                        {articles && <ReactMarkdown>{articles}</ReactMarkdown>}
                        {error && <p className="error-text">{error}</p>}     
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;