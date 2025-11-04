import React from "react";
import "./sections.css";
import { FaYoutube, FaFileAlt, FaClipboard, FaQuestionCircle } from "react-icons/fa";
function Section1(){
    return(
        <div className="section1">
            <div className="section1text"> 
                <h2>Welcome to  <b style={{fontWeight:"bolder",fontSize:"50px"}}>MyStudyBuddy</b></h2>
                <p>Our goal is to help you study more effectively.Your personal study assistant. Upload any material and watch it turn into clear summaries, flashcards, and study tools.</p>
            </div>
            <img src="./src/assets/banner.png" alt="Banner" />
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
                    <li><h1><FaYoutube /> Videos and articles recommendations</h1> <p>Get personalized recommendations for videos and articles.</p></li>
                </ul>
            </div>
        </div>
    )
}
        
export {Section1,Section2};
