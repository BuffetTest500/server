const { PreferenceInfo } = require('../models');

exports.create = async preferenceData => {
  try {
    const newPreferenceInfo = await PreferenceInfo.create(preferenceData);

    return newPreferenceInfo;
  } catch (error) {
    throw error;
  }
};

exports.update = async (userUid, preferenceData) => {
  try {
    await PreferenceInfo.update(preferenceData, {
      where: { userUid },
    });

    const updatedPreferenceInfo = await PreferenceInfo.findOne({
      where: { userUid },
    });

    return updatedPreferenceInfo;
  } catch (error) {
    throw error;
  }
};
