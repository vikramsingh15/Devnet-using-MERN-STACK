const Posts = require('../models/posts'),
  User = require('../models/user'),
  { validationResult } = require('express-validator');

module.exports = {
  async createPost(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id);
    req.body.avatar = user.avatar;
    req.body.name = user.name;
    req.body.user = user.id;
    const posts = await Posts.create(req.body);
    return res.json(posts);
  },

  async indexPosts(req, res, next) {
    const posts = await Posts.find().sort('-_id');
    res.json(posts);
  },

  async showPosts(req, res, next) {
    const post = await Posts.findById(req.params.id);
    res.json(post);
  },

  async deletePost(req, res, next) {
    const post = await Posts.findById(req.params.id);
    if (!post)
      return res.status(404).json({ errors: [{ msg: 'post not found!!' }] });

    //check whether user is owner of post
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'user not authorised!!' }] });
    }

    await post.remove();
    return res.json({ msg: 'Post deleted !!' });
  },

  async editPost(req, res, next) {
    let post = await Posts.findById(req.params.id);
    if (!post)
      return res.status(404).json({ errors: [{ msg: 'post not found!!' }] });

    //check whether user is owner of post
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'user not authorised!!' }] });
    }

    post = await Posts.findOneAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  },

  async likePost(req, res, next) {
    const post = await Posts.findById(req.params.id);
    if (!post)
      return res.status(404).json({ errors: [{ msg: 'post not found!!' }] });

    const check = post.likes.filter(
      user => user._id.toString() === req.user.id
    );
    if (check.length > 0)
      return res.json({
        errors: [{ msg: 'Post already liked!!' }]
      });

    post.likes.push(req.user.id);
    await post.save();
    return res.json(post.likes);
  },

  async unlikePost(req, res, next) {
    const post = await Posts.findById(req.params.id);
    if (!post)
      return res.status(404).json({ errors: [{ msg: 'post not found!!' }] });

    if (
      post.likes.filter(user => user._id.toString() === req.user.id).length ===
      0
    ) {
      return res.json({
        errors: [{ msg: 'Post not liked yet!!' }]
      });
    }

    post.likes = post.likes.filter(user => user._id.toString() !== req.user.id);

    await post.save();
    return res.json(post.likes);
  },

  async createComment(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id);
    const post = await Posts.findById(req.params.id);
    if (!post)
      return res.status(404).json({ errors: [{ msg: 'post not found!!' }] });

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar
    };
    post.comments.unshift(newComment);
    post.save();
    res.json(post.comments);
  },

  async deleteComment(req, res, next) {
    const { id, comment_id } = req.params;
    const post = await Posts.findById(req.params.id);
    if (!post)
      return res.status(404).json({ errors: [{ msg: 'post not found!!' }] });

    const comment = post.comments.find(comment => comment.id === comment_id);

    if (!comment) {
      return res.status(404).json({ errors: [{ msg: 'Comment not found!!' }] });
    }
    if (!comment.user.equals(req.user.id)) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'User not authorised!!' }] });
    }
    post.comments = post.comments.filter(comment => comment.id !== comment_id);
    await post.save();
    res.json(post.comments);
  }
};
