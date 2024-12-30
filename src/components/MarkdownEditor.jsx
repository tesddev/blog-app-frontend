import { useState } from 'react';
import PropTypes from 'prop-types';
import { marked } from 'marked';

const MarkdownEditor = ({ content, setContent }) => {
    const [preview, setPreview] = useState(false);

    return (
        <div>
            <button onClick={() => setPreview(!preview)}>
                {preview ? "Edit" : "Preview"}
            </button>
            {preview ? (
                <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
            ) : (
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            )}
        </div>
    );
};

MarkdownEditor.propTypes = {
    content: PropTypes.string.isRequired,
    setContent: PropTypes.func.isRequired,
};

export default MarkdownEditor;
