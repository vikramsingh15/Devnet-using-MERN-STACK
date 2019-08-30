const Profile = require('../models/profile'),
  request = require('request'),
  Posts=require('../models/posts'),
  { validationResult } = require('express-validator');

module.exports = {
  async getCurrentUserProfile(req, res, next) {
    const currentUserProfile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar', 'email']);
    if (!currentUserProfile) {
      return res
          .status(400)
          .json({ errors: [{ msg: 'No profile the user!!' }] });
    }
    res.json(currentUserProfile);
  },

  async createAndEditProfile(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      instagram,
      twitter,
      facebook,
      linkedin
    } = req.body;

    const profileField = {};
    if (company) profileField.company = company;
    if (website) profileField.website = website;
    if (location) profileField.location = location;
    if (status) profileField.status = status;

    if (bio) profileField.bio = bio;
    if (githubusername) profileField.githubusername = githubusername;

    if (skills)
      profileField.skills = skills.split(',').map(skill => skill.trim());

    profileField.social = {};

    if (youtube) profileField.social.youtube = youtube;
    if (linkedin) profileField.social.linkedin = linkedin;
    if (instagram) profileField.social.instagram = instagram;
    if (facebook) profileField.social.facebook = facebook;
    if (twitter) profileField.social.twitter = twitter;

    profileField.user = req.user.id;
    let profile = await Profile.findOneAndUpdate(req.user.id, profileField, {
      new: true,
      upsert: true
    });

    return res.json(profile);
  },

  async indexProfile(req, res, next) {
    const profile = await Profile.find({}).populate('user', [
      'name',
      'avatar',
      'email'
    ]);
    res.json(profile);
  },

  async showProfile(req, res, next) {
    try {
      const profile = await Profile.findById(req.params.user_id).populate(
        'user',
        ['name', 'avatar', 'email']
      );

      res.json(profile);
    } catch (err) {
      if (err.kind === 'ObjectId')
        return res
          .status(400)
          .json({ errors: [{ msg: 'Profile not found !!' }] });
    }
  },

  async deleteProfile(req, res, next) {
    await Profile.findOneAndRemove({ user: req.user.id });
    await Posts.findOneAndRemove({user:req.user.id});
    return res.json({ id: req.user.id });
  },

  async createExperience(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const experience = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(experience);
    await profile.save();
    res.json(profile);
  },

  async deleteExperience(req, res, next) {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(experience => {
      return experience.id !== req.params.exp_id;
    });
    await profile.save();
    return res.json(profile);
  },

  async editExperience(req, res, next) {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.map(experience => {
      if (experience.id === req.params.exp_id) {
        return req.body;
      }
      return experience;
    });
    await profile.save();
    return res.json(profile);
  },

  async getGitRepo(req, res, next) {
    try {
      const options = {
        uri: `https://api.github.com/users/${
          req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${
          process.env.gitId
        }&client_secret=${process.env.gitSecret}`,
        method: 'GET',
        headers: { 'user-agent': 'node.js' }
      };

      request(options, (error, response, body) => {
        if (error) console.error(error);

        if (response.statusCode !== 200) {
          return res.status(404).json({ errors: [{ msg: 'No profile found!!' }] });
        }

        res.json(JSON.parse(body));
      });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
};
