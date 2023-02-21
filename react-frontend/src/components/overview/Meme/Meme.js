import React from 'react';
import "./Meme.css"
function Meme({memeURL}) {
    return (
        // TODO overall good alt Text for ScreenReader Feature
        <img src={memeURL} alt="The Meme"/>
    );
}

export default Meme;