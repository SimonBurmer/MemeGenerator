import React, {useState} from 'react';
import Modal from 'react-modal';
import "./SingleView.css"
import Meme from "../overview/Meme/Meme";
import MemeMetaInformation from "../overview/MemeMetaInformation/MemeMetaInformation";
import NavigationOptions from "./NavigatorOptions/NavigationOptions";
import CommentList from "./Comments/CommentList";
import CommentInput from "./Comments/CommentInput";
import Statistics from "./Statistics/Statistics";

const SingleView = ({selectedMeme, filteredMemes, handleCloseSingleView}) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
        },
    };

    const [comments, setComments] = useState([
        {
            id: 1,
            author: "Flo",
            comment: "Wow was ein cooles Meme",
        },
        {
            id: 1,
            author: "Flo",
            comment: "Wow was ein cooles Meme!",
        },
        {
            id: 1,
            author: "Flo",
            comment: "Wow was ein cooles Meme!",
        }
    ])

    const handleNewComment = (comment) => {
        setComments([...comments, {id: 1, comment: comment}]);
    }

    const [currentMemeIndex, setCurrentMemeIndex] = useState(filteredMemes.findIndex(meme => {
        return meme.id === selectedMeme.id;
    }))

    return (
        <Modal isOpen={filteredMemes[currentMemeIndex]} style={customStyles} ariaHideApp={false}>
            <div className="meme-singleview-item">
                <div className={"meme-singleview-image"}>
                    <Meme meme={filteredMemes[currentMemeIndex].image}></Meme>
                </div>
                <div className={"meme-singleview-meta-information-container"}>
                    <MemeMetaInformation memeMetaInformation={{
                        title: filteredMemes[currentMemeIndex].title,
                        template: filteredMemes[currentMemeIndex].template,
                        votesTotal: filteredMemes[currentMemeIndex].votesTotal,
                        likes: filteredMemes[currentMemeIndex].likes,
                        dislikes: filteredMemes[currentMemeIndex].dislikes,
                        comments: filteredMemes[currentMemeIndex].comments
                    }}></MemeMetaInformation>
                    <NavigationOptions filteredMemes={filteredMemes} currentMemeIndex={currentMemeIndex} setCurrentMemeIndex={setCurrentMemeIndex}></NavigationOptions>
                </div>
            </div>
            <button className={"close-button-container"} onClick={handleCloseSingleView}>Close</button>
            <div className={"singleview-bottom-container"}>
                <div className={"comment-section"}>
                    <CommentList comments={comments}></CommentList>
                    <CommentInput onSubmit={handleNewComment}></CommentInput>
                </div>
                <Statistics></Statistics>
            </div>
        </Modal>
    );
};

export default SingleView;