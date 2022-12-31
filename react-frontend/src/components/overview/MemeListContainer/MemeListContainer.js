import React, {useState} from 'react';
import Meme from "../Meme/Meme";
import MemeMetaInformation from "../MemeMetaInformation/MemeMetaInformation";
import "./MemeListContainer.css";
import SingleView from "../../singleview/SingleView";

function MemeListContainer(props) {
    const [selectedMeme, setSelectedMeme] = useState(null);
    const filteredMemes = props.memes
    console.log("Filtered Memes: " + filteredMemes)
    /*
    const filteredMemes = props.memes.filter((meme) => {
        if (props.filter.name && !meme.name.toLowerCase().includes(props.filter.name.toLowerCase())) {
            return false;
        }
        /*
        if (props.filter.votesTotal && meme.votesTotal < props.filter.votesTotal) {
            return false;
        }
        if (props.filter.comments && meme.comments < props.filter.comments) {
            return false;
        }
        return true;
    });
    */

    const handleMemeClick = (meme) => {
        setSelectedMeme(meme);
    }
    const handleCloseSingleView = () => {
        setSelectedMeme(null);
    }

    return (
        <div className={"meme-list"}>
            {filteredMemes.map(meme => (
                <button className="meme-item" onClick={() => handleMemeClick(meme)}>
                    <div className={"meme-image"}>
                        <Meme meme={meme.templates.map(attribute => (attribute.url))}></Meme>
                    </div>
                    <MemeMetaInformation memeMetaInformation={{
                        name: meme.name,
                        template: meme.templates,
                        votesTotal: meme.votes,
                        //likes: meme.likes,
                        //dislikes: meme.dislikes,
                        //comments: meme.comments
                    }}></MemeMetaInformation>
                </button>
            ))}
            {selectedMeme && (
                <SingleView selectedMeme={selectedMeme} filteredMemes={filteredMemes}
                            handleCloseSingleView={handleCloseSingleView}/>
            )}
        </div>
    );
}

export default MemeListContainer;