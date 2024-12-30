// import React from 'react';
import PropTypes from 'prop-types';

const BlogPost = ({ post, onDelete }) => {
    return (
        <div className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => onDelete(post._id)}>Delete</button>
        </div>
    );
};

BlogPost.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default BlogPost;
