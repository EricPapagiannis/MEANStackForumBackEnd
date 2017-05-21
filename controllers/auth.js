var User = require('../models/User');

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
          res.status(200);
        })
     });
  }
}
