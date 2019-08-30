const express = require('express'),
  router = express.Router(),
  { auth, asyncErrorHandler } = require('../middleware'),
  { check } = require('express-validator'),
  {
    getCurrentUserProfile,
    createAndEditProfile,
    indexProfile,
    showProfile,
    deleteProfile,
    createExperience,
    editExperience,
    deleteExperience,
    getGitRepo
  } = require('../controllers/profile');

//@Route    GET '/api/profile/me'
//@desc     Get logged in user's profile
//@access   Private

router.get('/me', auth, asyncErrorHandler(getCurrentUserProfile));

//@Route    POST '/api/profile/me'
//@desc     Create and edit logged in user's profile
//@access   Private

router.post(
  '/me',
  [
    check('status', 'status required !!').exists(),
    check('skills', 'skills required !!').exists()
  ],
  auth,
  asyncErrorHandler(createAndEditProfile)
);

//@Route    PUT '/api/profile/me'
//@desc     Create and edit logged in user's profile
//@access   Private

router.put(
  '/me',
  [
    check('status', 'status required !!').exists(),
    check('skills', 'skills required !!').exists()
  ],
  auth,
  asyncErrorHandler(createAndEditProfile)
);

//@Route    GET '/api/profile'
//@desc     index all the profile
//@access   Public

router.get('/', asyncErrorHandler(indexProfile));

//@Route    GET '/api/profile/:user_id'
//@desc     show the profile
//@access   Public

router.get('/:user_id', asyncErrorHandler(showProfile));

//@Route    DELETE '/api/profile/'
//@desc     delete the currentUser's profile
//@access   Private

router.delete('/', auth, asyncErrorHandler(deleteProfile));

//@Route    POST '/api/profile/experience'
//@desc     create  the currentUser's experience
//@access   Private
router.post(
  '/experience',
  [
    auth,
    [
      check('title', 'title required !!').exists(),
      check('company', 'company required !!').exists(),
      check('from', 'from required !!').exists()
    ]
  ],
  asyncErrorHandler(createExperience)
);

//@Route    DELETE '/api/profile/experience/:exp_id'
//@desc     delete current user experience
//@access   Private
router.delete('/experience/:exp_id', auth, asyncErrorHandler(deleteExperience));

//@Route    EDIT '/api/profile/experience/:exp_id'
//@desc     Edit current user experience
//@access   Private
router.put('/experience/:exp_id', auth, asyncErrorHandler(editExperience));

//@Route    EDIT '/api/profile/github/:username'
//@desc     get recent 5 github repo
//@access   Public
router.get('/github/:username', asyncErrorHandler(getGitRepo));

module.exports = router;
