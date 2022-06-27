const router = require('express').Router();

const {
  getUsers,
  getUserId,
  getUserMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const { getUserIdValidation, updateProfileValidation, updateAvatarValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/', getUsers);
router.get('/:userId', getUserIdValidation, getUserId);
router.get('/me', getUserMe);
router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
