import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from 'react-bootstrap/Button';
import "./CommentInput.css"

function CommentInput(props) {
    const [comment, setComment] = useState("");
    const handleChangingComment = (event) => {
        setComment(event.target.value);
    }

    const handleCommentSubmit = () => {
        props.onSubmit(comment);
        setComment("");
    }

    return (
        <div className={"new-comment-section"}>
            <FloatingLabel controlId="floatingTextarea2" label={"New Comment"} className={"comment-list"}>
                <Form.Control
                    as="textarea"
                    value={comment}
                    style={{minHeight: '40px'}}
                    onChange={handleChangingComment}
                />
            </FloatingLabel>
            <Button className={"new-comment-button"} variant="outline-dark" onClick={handleCommentSubmit}>Add new
                Comment</Button>
        </div>
    );
}

export default CommentInput;