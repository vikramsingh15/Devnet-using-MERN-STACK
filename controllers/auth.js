const { validationResult } = require('express-validator'),
  User = require('../models/user'),
  bcryptjs = require('bcryptjs'),
  gravatar = require('gravatar'),
  jwt = require('jsonwebtoken');

module.exports = {
  async register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;
    try {
      //check user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User with email already exists !!' }]
        });
      }
      //save user
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({
        email,
        name,
        avatar,
        password
      });

      //hash pwd
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hashSync(password, salt);
      await user.save();

      //return jwt
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  },
  async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //check user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials !!' }]
        });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials !!' }]
        });
      }
      //return jwt
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  },
  async getAccountDetails(req, res, next) {
    
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }
};
