const { User } = require('../models/index');

exports.findOne = async email => {
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

exports.create = async userInfo => {
  const { email, uid, displayName, photoURL } = userInfo;
  try {
    const user = await User.create({
      uid,
      email,
      displayName,
      photoURL,
    });

    return user;
  } catch (error) {
    throw error;
  }
};
