// controllers/postsController.js
const Post = require("../models/Post");

// Create a new post
const createPost = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    
    try {
        const post = await Post.create({
            title,
            content,
            author: req.user, // Assuming req.user contains the logged-in user's ID
        });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "first_name last_name").lean();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a post
const updatePostContent = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body; // Only extract content

    if (!id) {
        return res.status(400).json({ message: 'Post ID is required.' });
    }

    if (!content) {
        return res.status(400).json({ message: 'Content is required.' });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { content }, // Only update the content field
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating post.' });
    }
};


// Delete a post
const deletePost = async (req, res) => {
  console.log('Received DELETE request for ID:', req.params.id);
  const { id } = req.params; // Extracting the ID from URL parameters
  console.log('Request Parameters:', req.params);


  if (!id) {
      return res.status(400).json({ message: 'Post ID is required.' });
  }

  try {
      const result = await Post.findByIdAndDelete(id);
      if (!result) {
          return res.status(404).json({ message: 'Post not found.' });
      }
      res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting post.' });
  }
};


module.exports = {
    createPost,
    getAllPosts,
    updatePostContent,
    deletePost,
};
