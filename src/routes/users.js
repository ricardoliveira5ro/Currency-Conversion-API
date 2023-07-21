const usersController = require('../controllers/users');
const router = require('express').Router();


router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);

module.exports = router;