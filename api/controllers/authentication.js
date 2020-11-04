var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var authService = require('../services/auth.service');

module.exports.register = function (req, res) {
    var user = new User();

    user.username = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
};

module.exports.login = function (req, res) {

    passport.authenticate('local', function (err, user, info) {
        var token;

        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user.userType === req.body.userType) {
            if (user) {
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token,
                    "user": user
                });
            } else {
                res.status(401).json(info);
            }
        } else {
            res.status(401).send({message: "not a " + req.body.userType})
        }

    })(req, res);
};

module.exports.authenticate = function (req, res) {
    // let validate = authService.Validate(req.body.token,function(err, result){
    //     if(err)
    //         res.status(500).send({ message: err.message });
    //     res.status(200).send({ result: result });
    // })
    // if (err) {
    //     res.status(500).send({ message: "Error" })
    // };
    res.status(200).send({message: "It works"});
}