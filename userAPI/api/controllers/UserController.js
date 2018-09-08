'user strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  user = mongoose.model('User');

  exports.register = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err, status:'400'
      });
    } else {
      // var token = jwt.sign({username: newUser.username}, 'secretkey');
      // return res.json(token
      return res.json({token: jwt.sign({ username: newUser.username}, 'secretkey'), status:'200'});
      }
  });
};



exports.signin = function(req, res) {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.', status: '401' });
    } else if (user) {
        return res.json({token: jwt.sign({ username: user.username}, 'secretkey'), status:'200'});
    }
  });
};
