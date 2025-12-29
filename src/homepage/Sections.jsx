import React from "react";
import "./sections.css";
import { FaYoutube, FaFileAlt, FaClipboard, FaQuestionCircle } from "react-icons/fa";

function Section1({banner}){
    return(
        <div className="section1">
            <div className="section1text"> 
                <h2>Bienvenue sur <b style={{fontWeight:"bolder",fontSize:"50px"}}>MyStudyBuddy</b></h2>
                <p>Notre objectif est de vous aider à étudier plus efficacement. Votre assistant d'études personnalisé. Téléchargez n'importe quel document et regardez-le se transformer en résumés clairs, fiches d'apprentissage et outils d'étude.</p>
            </div>
            < img src={`/assets/${banner}`} alt="Bannière" className="banner" />
        </div>
    )
}
function Section2(){
    return(
        <div className="section2">
            <h1>Pourquoi utiliser <b style={{fontWeight:"bolder",fontSize:"50px"}}>MyStudyBuddy?</b></h1>
            <div className="features">
                <ul className="featurelist">
                    <li><h1><FaFileAlt /> Résumé automatique</h1> <p>Générez automatiquement des résumés à partir de vos notes.</p></li>
                    <li><h1><FaClipboard /> Fiches d'apprentissage</h1> <p>Créez des fiches à partir de vos notes pour une mémorisation efficace.</p></li>
                    <li><h1><FaQuestionCircle /> Quiz</h1> <p>Testez vos connaissances avec des quiz basés sur votre matériel d'étude.</p></li>
                    <li><h1><FaYoutube /> Vidéos et articles</h1> <p>Recommandations personnalisées de vidéos et articles.</p></li>
                </ul>
            </div>
        </div>
    )
}
function Section3(){
    return(
        <div className="section3">
            <h1>Comment ça marche</h1>
            <p>MyStudyBuddy utilise des algorithmes avancés pour analyser vos matériels d'étude et générer des outils d'apprentissage utiles.</p>
            <div className="steps">
                <ul>
                    <li>
                    <h1>📤 Téléchargez</h1><p>Téléchargez vos matériels d'études.</p></li>
                    <li><h1>🧠 Analysez</h1><p>Laissez MyStudyBuddy analyser le contenu.</p></li>
                    <li><h1>📩 Recevez</h1><p>Recevez des outils d'étude personnalisés.</p></li>
                    <li><h1>🔍 Explorez</h1><p>Découvrez de nouvelles ressources d'étude.</p></li>
                </ul>
            </div>
        </div>
    )
};
function Section4(){
    return (
        <div className="section4">
            <div className="section4-badge">✨ Transformez Votre Expérience d'Apprentissage</div>
            
            <h2>
                Prêt à améliorer votre
                <span className="section4-highlight">efficacité d'étude?</span>
            </h2>
            
            <p>
                Téléchargez vos matériels, générez des résumés alimentés par l'IA, et commencez à apprendre de manière plus intelligente dès aujourd'hui. 
                Rejoignez des milliers d'étudiants qui réussissent déjà leurs objectifs.
            </p>
            
            <div className="section4-buttons">
                <a href="/signup" className="getstartedbtn">
                    Commencer Gratuitement
                    <span className="arrow-icon">→</span>
                </a>
                
                <a href="/demo" className="section4-secondary-btn">
                    <span>▶</span>
                    Voir la Démo
                </a>
            </div>
            
            <div className="section4-trust">
                <div className="trust-item">
                    <svg className="check-icon" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Aucune carte bancaire requise</span>
                </div>
                <div className="trust-item">
                    <svg className="check-icon" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Plan gratuit à vie</span>
                </div>
            </div>
        </div>
    )
}
function Footer(){
    return(
        <div className="footer bg-gray-900 text-white py-4 text-center">
            <p>© 2025 MyStudyBuddy. Tous droits réservés.</p>
        </div>
    )
}
export {Section1,Section2,Section3,Section4,Footer};
