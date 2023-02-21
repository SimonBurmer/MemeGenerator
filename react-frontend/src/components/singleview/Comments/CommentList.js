/*import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "./CommentList.css"
import UserService from "../../../services/userService";

function CommentList({comments}) {
    const userService = new UserService();
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        const fetchUsernames = async () => {
            const usernamePromises = comments.map((comment) => userService.getUserById(comment.userId));
            const usernames = await Promise.all(usernamePromises);
            setUsernames(usernames);
        }
        fetchUsernames();
    }, [comments]);

    return (
        <div>
            {comments.map((comment, index) => {
                return (
                    <FloatingLabel controlId="floatingTextarea2" label={"User: " + usernames[index].username} className={"comment-list"}>
                        <Form.Control
                            as="textarea"
                            value={comment.comment}
                            style={{minHeight: '40px', minWidth: '500px', resize: 'none', pointerEvents: 'none'}}
                        />
                    </FloatingLabel>
                );
            })}
        </div>
    );
}

export default CommentList;

*/
import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "./CommentList.css"
import UserService from "../../../services/userService";

function CommentList({comments}) {
    const userService = new UserService();
    const [usernames, setUsernames] = useState([]);

    useEffect(() => {
        const fetchUsernames = async () => {
            const usernamePromises = comments.map((comment) => userService.getUserById(comment.userId));
            const usernames = await Promise.all(usernamePromises);
            setUsernames(usernames);
        }
        fetchUsernames();
    }, [comments]);

    return (
        <div>
            {comments.map((comment, index) => {
                const username = usernames[index] ? usernames[index].username : 'Loading...';
                return (
                    <FloatingLabel controlId="floatingTextarea2" label={"User: " + username} className={"comment-list"}>
                        <Form.Control
                            as="textarea"
                            value={comment.comment}
                            style={{minHeight: '40px', minWidth: '500px', resize: 'none', pointerEvents: 'none'}}
                        />
                    </FloatingLabel>
                );
            })}
        </div>
    );
}

export default CommentList;
