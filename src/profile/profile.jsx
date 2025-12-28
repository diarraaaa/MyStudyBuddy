import React, { useState, useEffect } from 'react';
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
                    setError('Please enter some text to generate materials.');
                    return;
                }
                
                if (!selectedTask) {
                    setError('Please select a generation type.');
                    return;
                }

                // Reset all states
                setSummary(null);
                setReformulatedtext(null);
                setExplanation(null);
                setArticles(null);

                if (selectedTask === 'summary') {
                    const result = await summarizeText(texttouse);
                    setSummary(result);
                    setTasktodo('Summary');
                } else if (selectedTask === 'reformulate') {
                    const result = await reformulateText(texttouse);
                    setReformulatedtext(result);
                    setTasktodo('Reformulate');
                } else if (selectedTask === 'explanation') {
                    const result = await explainText(texttouse);
                    setExplanation(result);
                    setTasktodo('Explanation');
                } else if (selectedTask === 'articles') {
                    const result = await generateArticles(texttouse);
                    setArticles(result);
                    setTasktodo('Article Recommendations');
                }
            }
        } catch (error) { 
            console.error("Error generating study material:", error);
            setError('Error generating study material. Please try again.');
        } finally {
            setLoading(false);
            console.log("Task completed");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>My Study Buddy</h1>
                <h2>Hi {user ? user.user_metadata.username : 'Guest'}!</h2>
                <p>Generate summaries, quizzes, and flashcards from your content</p>
            </div>

            <div className="profile-content">
                <section className="profile-section">
                    <h2>Create Study Materials</h2>
                    
                    <div className="input-type-selector">
                        <button 
                            className={`type-btn ${inputType === 'file' ? 'active' : ''}`}
                            onClick={() => setInputType('file')}
                        >
                            📁 Upload File
                        </button>
                        <button 
                            className={`type-btn ${inputType === 'text' ? 'active' : ''}`}
                            onClick={() => setInputType('text')}
                        >
                            ✏️ Paste Text
                        </button>
                    </div>

                    <div className="upload-form">
                        <div className="form-group">
                            <label htmlFor="content-title">Title:</label>
                            <input 
                                type="text" 
                                id="content-title"
                                placeholder="Enter a title for your study material"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>
                        
                        {inputType === 'file' ? (
                            <div className="form-group">
                                <label htmlFor="content-file">Upload File:</label>
                                <input 
                                    type="file" 
                                    id="content-file"
                                    accept=".pdf,.doc,.docx,.txt"
                                />
                                <small className="helper-text">Supported formats: PDF, DOC, DOCX, TXT</small>
                            </div>
                        ) : (
                            <div className="form-group">
                                <label htmlFor="content-text">Paste Your Text:</label>
                                <textarea 
                                    id="content-text"
                                    rows="8"
                                    placeholder="Paste your course content, notes, or any text you want to study..."
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Generate:</label>
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="explanation" />
                                    <span>📖 Explanation</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="summary" defaultChecked />
                                    <span>📝 Summary</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="quiz" />
                                    <span>❓ Quiz</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="flashcards" />
                                    <span>🎴 Flashcards</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="video" />
                                    <span>🎥 Video recommendations</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="articles" />
                                    <span>📄 Article Recommendations</span>
                                </label>
                            </div>
                        </div>
                        <button className="btn-primary" onClick={generatematerial}>
                            Generate Study Materials
                        </button>
                    </div>
                </section>
                <section className="profile-section">
                    <h2>Generated Material: {tasktodo && <span>{tasktodo}</span>}</h2>
                    <div className="materials-list">
                        {title && <h2>{title}</h2>}
                        {loading && <p style={{ color: 'blue' }}>Generating material...</p>}    
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