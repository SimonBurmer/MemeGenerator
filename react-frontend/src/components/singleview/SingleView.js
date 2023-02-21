import React, {useState} from 'react';
import Modal from 'react-modal';
import "./SingleView.css"
import Meme from "../overview/Meme/Meme";
import MemeMetaInformation from "../overview/MemeMetaInformation/MemeMetaInformation";
import NavigationOptions from "./NavigatorOptions/NavigationOptions";
import CommentList from "./Comments/CommentList";
import CommentInput from "./Comments/CommentInput";
import Statistics from "./Statistics/Statistics";
import MemeService from "../../services/memeService";
import UserService from "../../services/userService";

const SingleView = ({selectedMemeIndex, filteredMemes, handleCloseSingleView, fetchMemes}) => {
    const memeService = new MemeService();
    const userService = new UserService();

    const handleNewComment = async (comment) => {
        const currentUser = await userService.getCurrentUser();
        await memeService.updateMemeById(filteredMemes[currentMemeIndex]._id, {
            comments: [...filteredMemes[selectedMemeIndex].comments, {
                userId: currentUser._id,
                comment: comment,
                commentDate: new Date().toISOString()
            }]
        });
        fetchMemes();
    }

    const [currentMemeIndex, setCurrentMemeIndex] = useState(selectedMemeIndex)

    return (
        <Modal isOpen={filteredMemes[currentMemeIndex]} style={customStyles} ariaHideApp={false}>
            <div className="meme-singleview-item">
                <div className={"meme-singleview-image"}>
                    <Meme memeURL={filteredMemes[currentMemeIndex].memeURL}></Meme>
                </div>
                <div className={"meme-singleview-meta-information-container"}>
                    <MemeMetaInformation meme={filteredMemes[currentMemeIndex]}
                                         fetchMemes={fetchMemes}></MemeMetaInformation>
                    <NavigationOptions filteredMemes={filteredMemes} currentMemeIndex={currentMemeIndex}
                                       setCurrentMemeIndex={setCurrentMemeIndex}></NavigationOptions>
                </div>
            </div>
            <button className={"close-button-container"} onClick={handleCloseSingleView}>Close</button>
            <div className={"singleview-bottom-container"}>
                <div className={"comment-section"}>
                    <CommentList comments={filteredMemes[selectedMemeIndex].comments}></CommentList>
                    <CommentInput onSubmit={handleNewComment}></CommentInput>
                </div>
                <Statistics></Statistics>
            </div>
        </Modal>
    );
};

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

export default SingleView;