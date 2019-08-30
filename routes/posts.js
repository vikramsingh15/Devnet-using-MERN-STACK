const express = require('express'),
  router = express.Router(),
  { auth, asyncErrorHandler } = require('../middleware'),
  { check } = require('express-validator'),
  {
    createPost,
    indexPosts,
    showPosts,
    deletePost,
    editPost,
    likePost,
    unlikePost,
    createComment,
    deleteComment
  } = require('../controllers/posts');

// @route    POST api/posts
// @desc     Create a post
// @access   Private

router.post(
  '/',
  [auth, check('text', 'text is required!!!').exists()],
  asyncErrorHandler(createPost)
);

// @route    GET api/posts
// @desc     get all posts
// @access   Private

router.get('/', auth, asyncErrorHandler(indexPosts));

// @route    GET api/posts/:id
// @desc     show post
// @access   Private

router.get('/:id', auth, asyncErrorHandler(showPosts));

// @route    DELETE api/posts/:id
// @desc     Delete post
// @access   Private

router.delete('/:id', auth, asyncErrorHandler(deletePost));

// @route    PUT api/posts/:id
// @desc     edit post
// @access   Private

router.put('/:id', auth, asyncErrorHandler(editPost));

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, asyncErrorHandler(likePost));

// @route    DELETE api/posts/like/:id
// @desc     unlike a post
// @access   Private
router.put('/unlike/:id', auth, asyncErrorHandler(unlikePost));

// @route    POST api/posts/:id/comment
// @desc     Create a comment
// @access   Private

router.post(
  '/:id/comment',
  [auth, check('text', 'text is required!!!').exists()],
  asyncErrorHandler(createComment)
);

// @route    DELETE api/posts/:id/comment/comment_id
// @desc     Delete a comment
// @access   Private

router.delete(
  '/:id/comment/:comment_id',
  auth,
  asyncErrorHandler(deleteComment)
);
module.exports = router;
