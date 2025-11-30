import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {supabase} from '../supabase';
import './profile.css';
import ReactMarkdown from 'react-markdown'
import {imagetoText} from '../services/groq';
import {summarizeText} from '../services/groq';
import { reformulateText } from '../services/groq';
import {generateArticles} from '../services/groq'
import {explainText} from '../services/groq'

function Profile() {
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
    const [inputType, setInputType] = useState('file'); 
    const [summary,setsummary]=useState('')
    const [reformulatedtext,setreformulatedtext]=useState('')
    const [explanation,setexplanation]=useState('')
    const [articles,setarticles]=useState('')
    const [loading,setloading]=useState(false)
    const [error,seterror]=useState(null)
    const [tasktodo,settasktodo]=useState('')
    const [title,settitle]=useState('')
    const generatematerial=async()=>{
        try{
                setloading(true)
                if(inputType==='text'){
                    const texttouse=document.getElementById('content-text').value;
                    settasktodo(document.querySelector('input[name="generation-type"]:checked').value);
                        if(tasktodo==='summary'){
                            seterror(null)
                            setsummary(null);
                            const result=await summarizeText(texttouse);
                            setsummary(result)
                            setreformulatedtext(null)
                            setexplanation(null);
                            setarticles(null);
                            settasktodo('Summary')
                        }
                        else if(tasktodo==='reformulate'){
                            seterror(null)
                            setreformulatedtext(null);
                            const result=await reformulateText(texttouse);
                            setreformulatedtext (result);
                            setsummary(null);
                            setexplanation(null);
                            setarticles(null);
                            settasktodo('Reformulate')
        
                        }else if(tasktodo==='explanation'){
                            seterror(null)
                            setexplanation(null);
                            const result= await explainText(texttouse)
                            setexplanation(result);
                            setsummary(null);
                            setreformulatedtext(null);
                            setarticles(null);
                            settasktodo('Explanation')
                        }else if (tasktodo==='articles'){
                            seterror(null)
                            setarticles(null)
                            const result=await generateArticles (texttouse)
                            setarticles(result)
                            setsummary(null);
                            setreformulatedtext(null);
                            setexplanation(null);
                            settasktodo('Article Recommendations')
                        }
                }
        }catch(error){ 
                console.error("Error generating study material:", error);
                seterror('Error generating study material. Please try again.');
        }finally{
                setloading(false)
                console.log("Task completed")
        }
    }
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
                                onChange={(e) => settitle(e.target.value)}
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
                        <button className="btn-primary" onClick={generatematerial}>Generate Study Materials</button>
                    </div>
                </section>
                <section className="profile-section">
                    <h2>My Study Materials</h2>
                    <div className="materials-list">
                        {title ? <h2>{title}</h2> : null}
                        {loading ? <p style={{ color: 'blue' }}>Generating material...</p>:null}    
                        {summary ? <ReactMarkdown>{summary}</ReactMarkdown> : null}
                        {reformulatedtext ? <ReactMarkdown>{reformulatedtext}</ReactMarkdown> : null}
                        {explanation ? <ReactMarkdown>{explanation}</ReactMarkdown> : null}
                        {articles ? <ReactMarkdown>{articles}</ReactMarkdown> : null}
                        {error && <p className="error-text">{error}</p>}     
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Profile;