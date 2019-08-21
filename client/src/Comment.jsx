import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function Comment() {
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        axios.post('/comments', {
            comment: newComment,
            like: false
        })
    },[newComment])

    useEffect(() => {
        axios.get('/comments').then((response) => {
          setComments(response.data)
        })
    }, [newComment, comments])
    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setNewComment(e.target.comment.value)
    }

    const handleDeleteComment = (id) => (e) => {
        e.preventDefault();
        axios.delete(`/comments/${id}`, () => {});
    }

    const handleEditComment = (id) => (e) => {
        e.preventDefault();
        axios.put(`/comments/${id}`, () => {})
    }

    let content;
    // todo: only render if token is present
    if (comments) {
        content = comments.map((comments, id) => {
            return  <div>
                        <p alt='roverComments' 
                            className='rover-comments' 
                            key={id}>{comments.comment}</p>
                        <button action="PUT">edit</button>
                        <button action="DELETE" onClick={handleDeleteComment(id)}>delete</button>
                    </div>
        })
        // content = <p>pictures are here</p>

    } else {
    // there is no data, show a placeholder
        content = <p>Click a rover to see pictures!</p>
    }

    return(
        <div>
            <h3>enter a comment below</h3>
            <form onSubmit={handleCommentSubmit} action="POST">
                <textarea name="comment" onSubmit={setNewComment} cols="80" rows="5"></textarea>
                <br/>
                <button>Submit</button>
            </form>
            {content}
        </div>
    )
}

export default Comment;
