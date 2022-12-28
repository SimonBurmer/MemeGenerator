import React from 'react';
import "./Meme.css"
function Meme({meme}) {
    return (
        <img src={meme}/>
    );
}

export default Meme;