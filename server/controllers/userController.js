const User = require("../models/user");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username, password})

    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};