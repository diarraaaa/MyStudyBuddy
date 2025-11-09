import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {supabase} from '../supabase';
import './profile.css';

function Profile() {
    const [inputType, setInputType] = useState('file'); // 'file' or 'text'
    const [user, setUser] = useState(null);
    const navigate=useNavigate()
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if(!user){
            navigate('/')
        }
        };
        fetchUser();
        console.log(user);
    }, []);

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

                        {/* Generation Options */}
                        <div className="form-group">
                            <label>Generate:</label>
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="summary" defaultChecked />
                                    <span>📝 Summary</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="quiz" defaultChecked />
                                    <span>❓ Quiz</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="flashcards" defaultChecked />
                                    <span>🎴 Flashcards</span>
                                </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="video" defaultChecked />
                                    <span>🎥 Video recommendations</span>
                                </label>
                                <label className='checkbox-label'>
                                    <input type="radio" name="generation-type" value="articles" defaultChecked />
                                    <span>📄 Article Recommendations</span>
                                </label>
                            </div>
                        </div>
                        <button className="btn-primary">Generate Study Materials</button>
                    </div>
                </section>
                <section className="profile-section">
                    <h2>My Study Materials</h2>
                    <div className="materials-list">
                        <p>No study materials generated yet. Upload a file or paste text to get started!</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;