import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getCookie('accessToken');
        try {
            const response = await axios.post('/api/posts', { title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Post created:', response.data);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;
