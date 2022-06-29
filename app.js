/** Simple demo Express app. */

const express = require("express");
const app = express();

const { findMean, findMedian, findMode } = require("./stats");
const { convertStrNums } = require("./utils");

const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs:
 *  Returns { response: { operation: "mode", value: result }} */
app.get("/mean", function (req, res) {

  if (!(req.query.nums)) {
    throw new BadRequestError(MISSING);
  }

  const nums = req.query.nums.split(",");
  const newNums = convertStrNums(nums);
  const mean = findMean(newNums);

  return res.json({ response: { operation: "mean", value: mean, } });
});

/** Finds median of nums in qs:
 *  Returns { response: { operation: "mode", value: result }} */
app.get("/median", function (req, res) {

  if (!(req.query.nums)) {
    throw new BadRequestError(MISSING);
  }

  const nums = req.query.nums.split(",");
  const newNums = convertStrNums(nums);
  const median = findMedian(newNums);

  return res.json({ response: { operation: "median", value: median, } });
});


/** Finds mode of nums in qs:
 *  Returns { response: { operation: "mode", value: result }} */
app.get("/mode", function (req, res) {

  if (!(req.query.nums)) {
    throw new BadRequestError(MISSING);
  }

  const nums = req.query.nums.split(",");
  const newNums = convertStrNums(nums);
  const mode = findMode(newNums);

  return res.json({ response: { operation: "mode", value: mode, } });
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;