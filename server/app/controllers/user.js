const User = require('../../app/models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../validation/registerValidation.js');
const validateLoginInput = require('../../validation/loginValidation.js');

module.exports = {
  login: async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(user => {
      if (!user) {
        return res.status(404).json({ emailNotFound: 'email not found' });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name
          };

          jwt.sign(
            payload,
            'secret',
            
            (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`,
                userId: user.id
              });
            }
          );
        } else {
          return res.status(200).json({
            msg: 'password incorrect',
            status: 'failed'
          });
        }
      });
    });
  },
  register: async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ message: 'email already exists' });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                return res.json(user);
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};
