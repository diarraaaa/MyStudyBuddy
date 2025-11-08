import React from "react";
import "./sections.css";
import { FaYoutube, FaFileAlt, FaClipboard, FaQuestionCircle } from "react-icons/fa";

function Section1({banner}){
    return(
        <div className="section1">
            <div className="section1text"> 
                <h2>Welcome to  <b style={{fontWeight:"bolder",fontSize:"50px"}}>MyStudyBuddy</b></h2>
                <p>Our goal is to help you study more effectively.Your personal study assistant. Upload any material and watch it turn into clear summaries, flashcards, and study tools.</p>
            </div>
            < img src={`./src/assets/${banner}`} alt="Banner" className="banner" />
        </div>
    )
}
function Section2(){
    return(
        <div className="section2">
            <h1>Why use <b style={{fontWeight:"bolder",fontSize:"50px"}}>MyStudyBuddy?</b></h1>
            <div className="features">
                <ul className="featurelist">
                    <li><h1><FaFileAlt /> Summarization</h1> <p>Automatically generate summaries from your notes.</p></li>
                    <li><h1><FaClipboard /> Flashcards</h1> <p>Create flashcards from your notes for effective memorization.</p></li>
                    <li><h1><FaQuestionCircle /> Quizzes</h1> <p>Test your knowledge with quizzes based on your study material.</p></li>
                    <li><h1><FaYoutube /> Videos and articles </h1> <p>Personalized recommendations for videos and articles.</p></li>
                </ul>
            </div>
        </div>
    )
}
function Section3(){
    return(
        <div className="section3">
            <h1>How it works</h1>
            <p>MyStudyBuddy uses advanced algorithms to analyze your study materials and generate useful study aids.</p>
            <div className="steps">
                <ul>
                    <li>
                    <h1>📤 Upload</h1><p>Upload your study materials.</p></li>
                    <li><h1>🧠 Analyze</h1><p>Let MyStudyBuddy analyze the content.</p></li>
                    <li><h1>📩 Receive</h1><p>Receive personalized study aids.</p></li>
                    <li><h1>🔍 Explore</h1><p>Discover new study resources.</p></li>
                </ul>
            </div>
        </div>
    )
};
function Section4(){
    return (
        <div class="section4">
            <div class="section4-badge">✨ Transform Your Learning Experience</div>
            
            <h2>
                Ready to boost your
                <span class="section4-highlight">study efficiency?</span>
            </h2>
            
            <p>
                Upload your materials, generate AI-powered summaries, and start learning smarter today. 
                Join thousands of students already crushing their goals.
            </p>
            
            <div class="section4-buttons">
                <a href="/signup" class="getstartedbtn">
                    Get Started Free
                    <span class="arrow-icon">→</span>
                </a>
                
                <a href="/demo" class="section4-secondary-btn">
                    <span>▶</span>
                    Watch Demo
                </a>
            </div>
            
            <div class="section4-trust">
                <div class="trust-item">
                    <svg class="check-icon" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>No credit card required</span>
                </div>
                <div class="trust-item">
                    <svg class="check-icon" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Free forever plan</span>
                </div>
            </div>
        </div>
    )
}
function Footer(){
    return(
        <div className="footer bg-gray-900 text-white py-4 text-center">
            <p>© 2025 MyStudyBuddy. All rights reserved.</p>
        </div>

    )
}
export {Section1,Section2,Section3,Section4,Footer};