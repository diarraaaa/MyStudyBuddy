import { useState } from 'react';
import '../profile/profile.css';
import ReactMarkdown from 'react-markdown';
import { summarizeText, reformulateText, generateArticles, explainText } from '../services/groq';

function Try() {
    const [inputType, setInputType] = useState('file'); 
    const [summary, setSummary] = useState('');
    const [reformulatedtext, setReformulatedtext] = useState('');
    const [explanation, setExplanation] = useState('');
    const [articles, setArticles] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasktodo, setTasktodo] = useState('');
    const [title, setTitle] = useState('');

    const generatematerial = async () => {
        try {
            setLoading(true);
            setError(null);
            
            if (inputType === 'text') {
                const texttouse = document.getElementById('content-text').value;
                const selectedTask = document.querySelector('input[name="generation-type"]:checked')?.value;
                
                if (!texttouse.trim()) {
                    setError('Veuillez entrer du texte pour générer des matériaux.');
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
            console.error("Erreur lors de la génération du matériau d'étude:", error);
            setError('Erreur lors de la génération du matériau d\'étude. Veuillez réessayer.');
        } finally {
            setLoading(false);
            console.log("Tâche terminée");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Mon Assistant d'Étude</h1>
                <h2>Bonjour Invité!</h2>
                <p>Générez des résumés, des quiz et des fiches à partir de votre contenu</p>
            </div>
            <div className="profile-content">
                <section className="profile-section">
                    <h2>Créer des supports d'Étude</h2>
                    <div className="input-type-selector">
                        <button 
                            className={`type-btn ${inputType === 'file' ? 'active' : ''}`}
                            onClick={() => setInputType('file')}
                        >
                            📁 Importer un Fichier
                        </button>
                        <button 
                            className={`type-btn ${inputType === 'text' ? 'active' : ''}`}
                            onClick={() => setInputType('text')}
                        >
                            ✏️ Coller du Texte
                        </button>
                    </div>

                    <div className="upload-form">      
                        {inputType === 'file' ? (
                            <div className="form-group" style={{fontWeight: "bold", color: "red"}}>
                                🔒 Connectez-vous pour utiliser la fonction d'import de fichier 🔒
                            </div>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label htmlFor="content-title">Titre:</label>
                                    <input 
                                        type="text" 
                                        id="content-title"
                                        placeholder="Entrez un titre pour votre matériau d'étude"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                    />
                                </div> 
                                <div className="form-group">
                                    <label htmlFor="content-text">Collez Votre Texte:</label>
                                    <textarea 
                                        id="content-text"
                                        rows="8"
                                        placeholder="Collez le contenu de votre cours, vos notes ou tout texte que vous souhaitez étudier..."
                                    />
                                </div>
                            </>
                        )}
                        <div className="form-group">
                            <label>Générer:</label>
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="explanation" />
                                    <span>❓ Explication</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="summary" />
                                    <span>📝 Résumé</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="articles" />
                                    <span>📄 Recommandations d'Articles</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="reformulate" />
                                    <span>🔄 Reformuler</span>
                                </label>
                            </div>
                        </div>
                        <button className="btn-primary" onClick={generatematerial}>
                            Générer les Supports d'Étude
                        </button>
                        <div className="form-group">
                            <label>Fonctionnalités Premium (Inscription requise):</label>
                            <div className="checkbox-group premium-features">
                                <label className="checkbox-label disabled">
                                    <span>❓ Quiz 🔒</span>
                                </label>
                                <label className="checkbox-label disabled">            
                                    <span>🎴 Fiches Mémo 🔒</span>
                                </label>
                                <label className="checkbox-label disabled">
                                    <span>🎥 Recommandations Vidéo 🔒</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="profile-section">
                    <h2>Support d'Étude Généré: {tasktodo ? <span>{tasktodo}</span> : null}</h2>
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
                <section className="profile-section">
                    <h2>Mes Supports d'Étude</h2>
                    <div className="materials-list">
                        <p style={{ color: 'red', fontWeight: 'bold' }}>
                            Vous utilisez la version gratuite de Mon Assistant d'Étude. Veuillez vous inscrire à un compte premium pour accéder à vos matériaux d'étude antérieurs et à plus de fonctionnalités!
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Try;