"use strict";
exports.addISOWeekYears = addISOWeekYears;
var _index = require("./getISOWeekYear.cjs");
var _index2 = require("./setISOWeekYear.cjs");

/**
 * The {@link addISOWeekYears} function options.
 */

/**
 * @name addISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be added.
 * @param options - An object with options
 *
 * @returns The new date with the ISO week-numbering years added
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * const result = addISOWeekYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
function addISOWeekYears(date, amount, options) {
  return (0, _index2.setISOWeekYear)(
    date,
    (0, _index.getISOWeekYear)(date, options) + amount,
    options,
  );
}
