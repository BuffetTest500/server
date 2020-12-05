const { User } = require('../models');

exports.findByEmail = async email => {
  try {
    const user = await User.findOne({
      where: { email }
    });

    if (!user) return;

    return user;
  } catch (error) {
    throw error;
  }
};

exports.findByUid = async uid => {
  try {
    const user = await User.findOne({
      where: { uid }
    });

    if (!user) return;

    return user;
  } catch (error) {
    throw error;
  }
};

exports.create = async userInfo => {
  const { email, uid, displayName, photoURL } = userInfo;
  try {
    const user = await User.create({
      uid,
      email,
      displayName,
      photoURL,
      preferenceInfo: null,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

exports.updateUserPreferenceInfoId = async (uid, preferenceInfoId) => {
  try {
    await User.update({
      preferenceInfoId
    }, {
      where: { uid },
    });

    const updatedUser = await User.findOne({
      where: { uid },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
