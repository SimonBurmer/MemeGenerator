const User = require("../models/user.model");
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

const getUserById = async (req, res) => {
    console.log(req.query.id)
    User.findOne({_id: req.query.id})
        .then(result => {
            res.send(result)
        })
        .catch(() => console.log(`ERROR in /getUserById: could not find user with ID ${req.query.id}`))
};

const getCurrentUser = async (req, res) => {
    console.log(req.query.id)
    User.findOne({googleId: req.query.id})
        .then(result => {
            res.send(result)
        })
        .catch(() => console.log(`ERROR in /getUserById: could not find user with ID ${req.query.id}`))
};

module.exports = {
    getUserById,
    getCurrentUser,
};