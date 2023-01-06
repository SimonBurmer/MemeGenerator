import React, {useState} from 'react';
import Meme from "../Meme/Meme";
import MemeMetaInformation from "../MemeMetaInformation/MemeMetaInformation";
import "./MemeListContainer.css";
import SingleView from "../../singleview/SingleView";

function MemeListContainer({memes, filter, refetchMemes}) {
    const [selectedMemeIndex, setSelectedMemeIndex] = useState();
    const creationDate = filter.creationDate ? new Date(filter.creationDate) : null;

    const filteredMemes = memes.filter((meme) => {
        if (filter.title && !meme.title.toLowerCase().includes(filter.title.toLowerCase())) {
            return false;
        }
        // exchange with Creator Name
        if (filter.creator && !meme.creatorId.toLowerCase().includes(filter.creator.toLowerCase())) {
            return false;
        }
        if (filter.likes && meme.votes.filter(vote => vote.votingType === "like").length < filter.likes) {
            return false;
        }
        if (filter.dislikes && meme.votes.filter(vote => vote.votingType === "dislike").length < filter.dislikes) {
            return false;
        }
        if (filter.comments && meme.comments.length < filter.comments) {
            return false;
        }
        if (creationDate && new Date(meme.creationDate) < creationDate) {
            return false;
        }
        return true;
    });


    const handleMemeClick = (memeIndex) => {
        setSelectedMemeIndex(memeIndex);
    }
    const handleCloseSingleView = () => {
        setSelectedMemeIndex(null);
    }

    return (
        <div className={"meme-list"}>
            {filteredMemes.map((meme, memeIndex) => (
                <button className="meme-item" key={meme._id} onClick={() => handleMemeClick(memeIndex)}>
                    <div className={"meme-image"}>
                        <Meme memeURL={meme.memeURL}></Meme>
                    </div>
                    <MemeMetaInformation meme={meme} refetchMemes={refetchMemes}></MemeMetaInformation>
                </button>
            ))}
            {selectedMemeIndex !== null && selectedMemeIndex !== undefined && (
                <SingleView selectedMemeIndex={selectedMemeIndex} filteredMemes={filteredMemes}
                            handleCloseSingleView={handleCloseSingleView} refetchMemes={refetchMemes}/>
            )}
        </div>
    );

}

export default MemeListContainer;