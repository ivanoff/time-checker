/***
 * Check current time in a specified period
 * Example of usage:
 *   var CheckTime = require('time-checker');
 *   var checkTime = new CheckTime({ daysOff : [0, 7], holidays : ['1.01', '7.01'] });
 *   // checking 'Mon Jun 06 11:13:26 2016' (1465200806000) on perioud '9:00-17:00'
 *   checkTime.byConditions('9:00-17:00', 1465200806000); // true
 *   // is Sunday is a rest day?
 *   checkTime.byConditions('restdays', 1465200806000); // true
 *   // is 'Mon Jun 06 11:13:26 2016' (1465114426000) is a rest day with perioud '9:00-17:00'?
 *   checkTime.byConditions(['9:00-17:00', 'restdays'], 1465200806000); // false
 *   // if current time is my working days free time?
 *   checkTime.byConditions(['18:00-23:59', '00:00-10:00', 'workdays']); // it depends on current time
 */
'use strict';

var moment = require('moment');

/**
 * Create a time-checker application
 * @return {Object}
 */
exports = module.exports = function(options) {
  if(!options) options = {};

  if(!options.daysOff) options.daysOff = [];
  if(!options.holidays) options.holidays = [];

  return {
    options: options,
    byConditions : checkTimeByConditions,
  };
}

/**
 * Check whether the current time and date fits under the described conditions.
 * Returns true if the current time and date is within the described terms.
 * Examples:
 *   checkTimeByConditions(['9:00-17:00','workdays'])
 *   checkTimeByConditions(['17:00-23:59','00:00-8:59'])
 */
function checkTimeByConditions(conditions, timestamp) {
  if(!conditions) return true;

  var resultTime = [];
  var resultWeek = true;
  var current = moment(timestamp);

  conditions = Array.isArray(conditions)? conditions : [conditions];
  var conditionsLength = conditions.length;

  for(var i = 0; i < conditionsLength; i++) {
    var e = conditions[i];

    var r = e.match(/^(\d+):(\d+)-(\d+):(\d+)$/);
    if(r && r[4]) {
      var timeFrom = moment(current).hour(r[1]).minute(r[2]);
      var timeTo = moment(current).hour(r[3]).minute(r[4]);
      resultTime.push(current.unix() >= timeFrom.unix() && current.unix() <= timeTo.unix());
    }

    var d = this.options.daysOff;
    var h = this.options.holidays;
    if(e === 'workdays')
      resultWeek = d.indexOf(current.day()) < 0 && h.indexOf(current.format('D.MM')) < 0;
    if(e === 'restdays')
      resultWeek = d.indexOf(current.day()) >= 0 || h.indexOf(current.format('D.MM')) >= 0;

  }

  resultTime = !resultWeek? [] : resultWeek && !resultTime.length? [true] : resultTime;
  return resultTime.indexOf(true) > -1;
}
