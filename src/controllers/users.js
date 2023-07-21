const usersService = require('../services/users');

const getUsers = async (req, res) => {
    const id = req.body
    try {
        const users = await usersService.getUsers();
        res.status(200).json(users);
    }
    catch (e) {
        res.status(500).send(e);
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await usersService.getUserById(id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).send(e);
    }
}

module.exports = {
    getUsers, getUserById
}