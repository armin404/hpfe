import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../providers/AuthProvider';
import axios from '../../api/Requests';
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'

export default function HomePage() {
    const { auth } = useContext(AuthContext);
    const [postID, setPostID] = useState("");
    const [data, setData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [comments, setComments] = useState();
    const [comment,setComment] = useState("");
    useEffect(async () => {
        try {
            const response = await axios.get("/posts", data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    }, [])
    const changeOpen = () => {
        setIsOpen(!isOpen)
    }
    const changeOpen2 = () => {
        setIsOpen2(!isOpen2)
    }
    const postComment = async (e) => {
        e.preventDefault();
        var data = JSON.stringify({
            "commentText": comment
        });
        try {
            const url="/posts/"+postID+"/comments";
            const response = await axios.post(url, data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            try {
                const response = await axios.get("/posts", data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
            changeOpen();
            setComment("");
        } catch (err) {
            changeOpen();
        }
    }
    return (

        <div className="container-lg">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8"><h2>HulkApps posts</h2></div>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Post</th>
                                <th>Posted on</th>
                                <th># of Comments</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.data.map(item => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.comments.length}</td>
                                        <td>
                                            <a class="edit" onClick={() => { setPostID(item._id); changeOpen(); }} title="Comment" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                            <a class="delete" onClick={() => { setComment("");setPostID(item._id);changeOpen2(); setComments(item.comments) }} title="Show comments" data-toggle="tooltip"><i class="material-icons">&#xE625;</i></a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className='text-center'>
                <Link to="/">
                    <button className="primary-button">Log out</button>
                </Link>
            </div>
            <Modal
                show={isOpen}
                onHide={changeOpen}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <h5>Comment on post {postID}</h5>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={postComment}>

                <textarea placeholder="Enter your comment" rows="15" name="comment[text]" id="comment_text" cols="45" onChange={(e)=>setComment(e.target.value)} value={comment} role="textbox" aria-autocomplete="list" aria-haspopup="true"></textarea>
                <button id="register_btn" type="submit">Add comment</button>

                </form>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            <Modal
                show={isOpen2}
                onHide={changeOpen2}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <h5>Comments on post {postID}</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                    {comments && comments.map(item => {
                                return (
                                    <div key={item._id}>
                                        <p>{item.commentText} posted on {item.createdAt}</p>
                                    </div>
                                );
                            })}
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>

    )
}
