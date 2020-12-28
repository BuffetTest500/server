const { User, PreferenceInfo, PortfolioItem, CompanyProfile } = require('../models');

const save = async () => {
  const fs = require('fs');
  const companyProfileRawData1 = fs.readFileSync('./models/summarys.json');
  const companyProfileRawData2 = fs.readFileSync('./models/summarys_2.json');
  const companyProfileData1 = JSON.parse(companyProfileRawData1);
  const companyProfileData2 = JSON.parse(companyProfileRawData2);
  const userRawData = fs.readFileSync('./models/userMockUpData.json');
  const userData = JSON.parse(userRawData);
  const preferenceInfoRawData = fs.readFileSync('./models/preferenceInfoMockUpData.json');
  const preferenceInfoData = JSON.parse(preferenceInfoRawData);
  const portfolioItemRawData = fs.readFileSync('./models/portfolioItemMockUpData.json');
  const portfolioItemData = JSON.parse(portfolioItemRawData);

  try {
    for (let i = 0; i < companyProfileData1.length; i++) {
      await CompanyProfile.create(companyProfileData1[i]);
      console.log(i + 1, companyProfileData1.length);
    }

    for (let i = 0; i < companyProfileData2.length; i++) {
      await CompanyProfile.create(companyProfileData2[i]);
      console.log(i + 1, companyProfileData2.length);
    }

    for (let i = 0; i < userData.length; i++) {
      await User.create(userData[i]);
      console.log(i + 1, userData.length);
    }

    for (let i = 0; i < preferenceInfoData.length; i++) {
      await PreferenceInfo.create(preferenceInfoData[i]);
      console.log(i + 1, preferenceInfoData.length);
    }

    for (let i = 0; i < portfolioItemData.length; i++) {
      await PortfolioItem.create(portfolioItemData[i]);
      console.log(i + 1, portfolioItemData.length);
    }
  } catch (error) {
    console.error(error);
  }
};

save();
