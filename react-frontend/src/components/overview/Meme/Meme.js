import React from 'react';
import "./Meme.css"
function Meme({memeURL}) {
    return (
        <img src={memeURL}/>
    );
}

export default Meme;