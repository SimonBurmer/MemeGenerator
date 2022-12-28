import React from 'react';
import "./MemeMetaInformation.css";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

function MemeMetaInformation({memeMetaInformation}) {

    const handleVoteClick = (event, voteTyp) => {
        event.stopPropagation();
        if (voteTyp === "like") {
            alert("The user has liked the meme");
        } else {
            alert("The user has disliked the meme");
        }
    }

    return (
        <div className="meta">
            <h2>Title: {memeMetaInformation.title}</h2>
            <h4>Template: {memeMetaInformation.template}</h4>
            <h4>Votes Total: {memeMetaInformation.votesTotal}</h4>
            <div className={"voting-container"}>
                <Button className={"voting-item"} variant="contained"
                        onClick={(event) => handleVoteClick(event, "like")}
                        startIcon={<FavoriteBorderIcon/>}>
                    {memeMetaInformation.likes}
                </Button>
                <Button className={"voting-item"} variant="contained"
                        onClick={(event) => handleVoteClick(event, "dislike")} startIcon={<HeartBrokenIcon/>}>
                    {memeMetaInformation.dislikes}
                </Button>

            </div>
            <h4>Comments: {memeMetaInformation.comments}</h4>
        </div>
    );
}

export default MemeMetaInformation;