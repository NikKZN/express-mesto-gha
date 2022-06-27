const router = require('express').Router();

const {
  getUsers,
  getUserId,
  getUserMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const { getUserIdValidation, updateProfileValidation, updateAvatarValidation } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', getUserIdValidation, getUserId);
router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
