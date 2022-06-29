const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3].
 *  if the conversion isn't successful, throw a BadRequestError.
*/

function convertStrNums(strNums) {

  for (let num of strNums) {
    if (isNaN(num)) {
      throw new BadRequestError(`${num} is not a number.`);
    }
  }

  return strNums.map(n => Number(n));
}


module.exports = { convertStrNums };