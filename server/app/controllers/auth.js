const jwt = require('jsonwebtoken');

module.exports = {
  isValidUser: async (req, res, next) => {
    var token = req.headers['authorization'].split('Bearer ')[1];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, 'secret', function(err, decoded) {
      console.log(err, 'err', decoded, 'decodeddecoded---');
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });

      next();
    });
  }
};
