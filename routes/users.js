const express = require('express');
const router = express.Router();
const { createPreferenceInfo, updatePreferenceInfo } = require('../controllers/preferenceInfo.controller');
const { updateUserInfo } = require('../controllers/user.controller');


router.post('/:user_id/preference_info', createPreferenceInfo);
router.put('/:user_id/preference_info', updatePreferenceInfo);
router.put('/:user_id', updateUserInfo);

module.exports = router;
