const userService = require('../services/userService');
const RESPONSE = require('../constants/response');

exports.updateUserInfo = async (req, res, next) => {
  const preferenceInfoId = req.body.preferenceInfo.id;
  const userUid = req.params.user_id;

  try {
    const updatedUser = await userService.updateUserPreferenceInfoId(userUid, preferenceInfoId);

    res.status(200).json({
      result: RESPONSE.OK,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
