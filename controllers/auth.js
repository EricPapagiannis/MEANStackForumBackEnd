var User = require('../models/User');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
  register: function(req, res) {
    console.log(req.body);
    User.findOne({
      email: req.body.email
    }, function (err, existingUser) {
        var user = new User(req.body);

        if(existingUser)
          return res.status(409).send({message: 'Email is already registered'});
        user.save(function(err, result) {
          if (err) {
            res.status(500).send({
              message: err.message
            });
          }
          res.status(200).send({token: createToken(result)});
        })
     });
  },
  login: function(req, res){
    User.findOne({
      email: req.body.email
    }, function (err, user) {

      if(!user)
          return res.status(401).send({message: 'Email or password invalid'});

      if (req.body.pwd == user.pwd) {
        res.send({
          token: createToken(user)
        });

      } else {
        return res.status(401).send({
          message: 'Invalid  email and/or password'
        });
      }
    });

  }
}

function createToken(user){
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, 'secret');
}
