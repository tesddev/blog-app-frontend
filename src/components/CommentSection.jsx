import React from 'react';
import PropTypes from 'prop-types';

const CommentSection = ({ comments, onAdd }) => {
    const [content, setContent] = React.useState("");

    const handleAdd = () => {
        onAdd(content);
        setContent("");
    };

    return (
        <div>
            <h3>Comments</h3>
            {comments.map((c) => (
                <div key={c._id}>{c.content}</div>
            ))}
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleAdd}>Add Comment</button>
        </div>
    );
};

CommentSection.propTypes = {
    comments: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default CommentSection;
