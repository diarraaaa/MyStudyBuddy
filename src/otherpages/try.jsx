import React from 'react';
import { useState } from 'react';
import '../profile/profile.css';
import ReactMarkdown from 'react-markdown'
import imagetoText from '../services/groq';
import {summarizeText} from '../services/groq';
import { reformulateText } from '../services/groq';
import {explainText} from '../services/groq'
function Try() {
    const [inputType, setInputType] = useState('file'); 
    const [summary,setsummary]=useState('')
    const [reformulatedtext,setreformulatedtext]=useState('')
    const [explanation,setexplanation]=useState('')
    const [loading,setloading]=useState(false)
    const [error,seterror]=useState(null)
    const generatematerial=async()=>{
        try{
            setloading(true)
            if(inputType==='text'){
                const texttouse=document.getElementById('content-text').value;
                const tasktodo=document.querySelector('input[name="generation-type"]:checked').value;
                    if(tasktodo==='summary'){
                        setsummary(null);
                        const result=await summarizeText(texttouse);
                        setsummary(result)
                        setreformulatedtext(null)
                        setexplanation(null);
                    }
                    else if(tasktodo==='reformulate'){
                        setreformulatedtext(null);
                        const result=await reformulateText(texttouse);
                        setreformulatedtext (result);
                        setsummary(null);
                        setexplanation(null);
                    }else if(tasktodo==='explanation'){
                        setexplanation(null);
                        const result= await explainText(texttouse)
                        setexplanation(result);
                        setsummary(null);
                        setreformulatedtext(null);
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
                <h2>Hi Guest!</h2>
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
                                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                                />
                                <small className="helper-text">Supported formats: PDF, DOC, DOCX, TXT, PNG, JPG, JPEG</small>
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
                                    <span>❓ Explanation</span>
                                 </label>
                                <label className="checkbox-label">
                                    <input type="radio" name="generation-type" value="summary" />
                                    <span>📝 Summary</span>
                                </label>
                                <label className='checkbox-label'>
                                    <input type="radio" name="generation-type" value="articles" />
                                    <span>📄 Article Recommendations</span>
                                </label>
                                <label className='checkbox-label'>
                                    <input type="radio" name="generation-type" value="reformulate" />
                                    <span>🔄 Reformulate</span>
                                </label>
                            </div>
                        </div>
                        <button className="btn-primary" onClick={generatematerial}>Generate Study Materials</button>
                        <div className="form-group">
                            <label>Premium Features (Sign up required):</label>
                            <div className="checkbox-group premium-features">
                                <label className="checkbox-label disabled">
                                    <span>❓ Quiz 🔒</span>
                                </label>
                                <label className="checkbox-label disabled">            
                                    <span>🎴 Flashcards 🔒</span>
                                </label>
                                <label className="checkbox-label disabled">
                                    <span>🎥 Video Recommendations 🔒</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="profile-section">
                    <h2>Generated Material</h2>
                    <div className="materials-list">
                       {loading ? <p style={{ color: 'blue' }}>Generating material...</p>:null}    
                       {summary ? <ReactMarkdown>{summary}</ReactMarkdown> : null}
                       {reformulatedtext ? <ReactMarkdown>{reformulatedtext}</ReactMarkdown> : null}
                       {explanation ? <ReactMarkdown>{explanation}</ReactMarkdown> : null}
                       {error && <p className="error-text">{error}</p>}
                    </div>
                </section>
                <section className="profile-section">
                    <h2>My Study Materials</h2>
                    <div className="materials-list">
                        <p style={{ color: 'red' ,fontWeight: 'bold'}}>You are using the free version of My Study Buddy. Please sign up for a premium account to access your past study materials and more features!</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default Try;