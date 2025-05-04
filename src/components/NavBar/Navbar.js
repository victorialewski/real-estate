import React from "react";
// import { MdExpandMore, MdExpandLess } from "react-icons/md";
// import "../SOW/SowItem.css";
// import "./SowLeft.css";
import { Link } from "react-router-dom";
import "./Navbar.css"

export default function Navbar({

}) {
    return (
        <div className="navbar">
            <div class = "card">
            <a href="/test">
           <div className = "rehab-Card">Scope of Work</div>
           </a>
           </div>           
           <div class = "card">
            <a href="/rehab">
           <div className = "rehab-Card">Rehab Calcualtor</div>
           </a>
           </div>       
           <div class = "card">
            <a href="/arv">
           <div className = "rehab-Card">ARV Calcualtor</div>
           </a>
           </div>    

        </div>
    );
}
