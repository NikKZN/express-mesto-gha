const router = require('express').Router();

const {
  getUsers,
  getUserId,
  getUserMe,
  // createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.get('/me', getUserMe);
// router.post('/users', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
