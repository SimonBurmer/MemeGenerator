import React from 'react';
import "./MemeMetaInformation.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/Button";
import MemeService from "../../../services/memeService";

function MemeMetaInformation({meme, fetchMemes}) {
    const memeService = new MemeService();
    const handleVoteClick = async (event, memeId, voteType) => {
        event.stopPropagation();
        const previousVotingType = await memeService.voteOnMeme(memeId, voteType);
        checkForPreviouslyVoted(previousVotingType, voteType);
        fetchMemes();
    }

    // under title <h4>Template: {memeMetaInformation.template}</h4>
    return (
        <div className="meta">
            <h2>Title: {meme.title}</h2>
            <h4>Template: TODOOO</h4>
            <h4>Votes Total: {meme.votes.length}</h4>
            <div className={"voting-container"}>
                <Button variant="success" onClick={(event) => handleVoteClick(event, meme._id, "like")}>
                    <FontAwesomeIcon icon={faThumbsUp}/>
                    {meme.votes.filter(vote => vote.votingType === "like").length}
                </Button>
                <Button variant="danger" onClick={(event) => handleVoteClick(event, meme._id, "dislike")}>
                    <FontAwesomeIcon icon={faThumbsDown}/>
                    {meme.votes.filter(vote => vote.votingType === "dislike").length}
                </Button>
            </div>
            <h4>Comments: {meme.comments.length}</h4>
        </div>
    );
}

const checkForPreviouslyVoted = (previousVotingType, voteType) => {
    if (previousVotingType === voteType) {
        alert(`You have already ${previousVotingType}d this meme`);
    }
}

export default MemeMetaInformation;