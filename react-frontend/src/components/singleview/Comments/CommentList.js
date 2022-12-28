import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "./CommentList.css"

function CommentList({comments}) {

    return (
        <div>
            {comments.map((comment) => (
            <FloatingLabel controlId="floatingTextarea2" label={"User: " + comment.author} className={"comment-list"}>
                <Form.Control
                    as="textarea"
                    value={comment.comment}
                    style={{minHeight: '40px', minWidth: '500px'}}
                />
            </FloatingLabel>
            ))}
        </div>
    );
}

export default CommentList;