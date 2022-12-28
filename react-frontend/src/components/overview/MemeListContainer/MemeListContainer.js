import React from 'react';
import Meme from "../Meme/Meme";
import MemeMetaInformation from "../MemeMetaInformation/MemeMetaInformation";
import "./MemeListContainer.css";

function MemeListContainer(props) {
    const filteredMemes = props.memes.filter((meme) => {
        if (props.filter.title && !meme.title.toLowerCase().includes(props.filter.title.toLowerCase())) {
            return false;
        }
        if (props.filter.votesTotal && meme.votesTotal < props.filter.votesTotal) {
            return false;
        }
        if (props.filter.comments && meme.comments < props.filter.comments) {
            return false;
        }
        return true;
    });
    const handleMemeClick = (event, title) => {
        alert("Meme with the name: " + title + " was clicked! Open SingleView Here")
    }

    return (
        <div className={"meme-list"}>
            {filteredMemes.map(meme => (
                <button className="meme-item" onClick={() => handleMemeClick(meme.title)}>
                    <div className={"meme-image"}>
                        <Meme meme={meme.image}></Meme>
                    </div>
                    <MemeMetaInformation memeMetaInformation={{
                        title: meme.title,
                        template: meme.template,
                        votesTotal: meme.votesTotal,
                        likes: meme.likes,
                        dislikes: meme.dislikes,
                        comments: meme.comments
                    }}></MemeMetaInformation>
                </button>
            ))}
        </div>
    );
}

export default MemeListContainer;