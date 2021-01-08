const hitService = require('../services/hit.service');
const { THIRTY_MINUTES, ONE_MINUTE } = require('../constants/numbers');
const RESPONSE = require('../constants/responses');

exports.createHit = async (req, res, next) => {
  const { symbol } = req.params;
  const { buffettTest500: userByCookie } = req.cookies;

  try {
    const pastHit = await hitService.getPast(symbol, userByCookie);

    if (pastHit && Date.now() - pastHit.updatedAt < THIRTY_MINUTES) {
      res.status(200).json({
        result: RESPONSE.OK,
        message: RESPONSE.REQUIRED_TIME_HAS_NOT_YET_PASSED,
      });

      return;
    }

    if (pastHit) {
      await hitService.updateUpdatedAt(pastHit);

      return;
    }

    await hitService.create(symbol, userByCookie);

    res.status(200).json({
      result: RESPONSE.OK,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTrendingStocks = async (req, res, next) => {
  let allHitsWithInTime;

  try {
    allHitsWithInTime = await hitService.getAllWithInTime(ONE_MINUTE);
  } catch (error) {
    next(error);
  }

  const hitsTable = {};

  allHitsWithInTime.forEach(hit => {
    const { symbol } = hit;

    if (!hitsTable.hasOwnProperty(symbol)) {
      hitsTable[symbol] = 0;
    }

    hitsTable[symbol]++;
  });

  const hitsSorted = Object
    .entries(hitsTable)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const result = [];

  hitsSorted.forEach(hitDataArray => {
    result.push(hitDataArray[0]);
  });

  try {
    res.status(200).json({
      result: RESPONSE.OK,
      topTen: result,
    });
  } catch (error) {
    next(error);
  }
};
