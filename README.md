
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]
[![Build Status: Linux][travis-image]][travis-url]
[![Build Status: Windows][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]


# Time checker

  v.0.1.2

  Checks current time in a specified period


## Install

`npm install time-checker`


## Usage Example

  Check if current time is my working days free time? Working time 10:00-18:00, Saturday and Sunday are a days off. Result depends on current time.

```javascript
var CheckTime = require('time-checker');
var checkTime = new CheckTime({ daysOff : [0, 6] });
checkTime.byConditions(['18:00-23:59', '00:00-10:00', 'workdays']);
```


## Option parameters
  - **daysOff** - list of days off. Array of numbers (`0` - Sun, `1` - Mon, ..., `6` - Sat)
  - **holidays** - list of holiday dates. Array of string (`'14.10'` means 14'th of October of each year)
  - **timeZone** - zone name used in value of TZ environment variable (ex. `America/Chicago`)


## Check time by conditions
  `checkTime.byConditions(<conditions>, [<current timestamp>])`

  - **conditions** - string or array of the strings with time conditions:
    - time interval (ex. `'9:00-21:00'`)
    - type of the day (`'workdays'` or `'restdays'`)
  - **current timestamp** - Unix Timestamp in milliseconds (ex. `1465200806000`), not required. If not set, then uses current timestamp.


## More Examples

  Set Saturday and Sunday as a days off. Holidays are first and seventh of January.

```javascript
var CheckTime = require('time-checker');
var checkTime = new CheckTime({ daysOff : [0, 6], holidays : ['1.01', '7.01'], timeZone: 'Etc/GMT' });

// checking 'Mon Jun 06 11:13:26 2016' on perioud '9:00-17:00'
checkTime.byConditions('9:00-17:00', 1465200806000); // true

// is Sunday is a rest day?
checkTime.byConditions('restdays', 1465200806000); // true

// is 1'st of January is a rest day?
checkTime.byConditions('restdays', 1483272000000); // true

// is 'Mon Jun 06 11:13:26 2016' is a rest day with perioud '9:00-17:00'?
checkTime.byConditions(['9:00-17:00', 'restdays'], 1465200806000); // false
```


## Change Log

  [all changes](CHANGELOG.md)


## Created by

  Dimitry Ivanov <2@ivanoff.org.ua> # curl -A cv ivanoff.org.ua

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/time-checker
[npm-version-image]: http://img.shields.io/npm/v/time-checker.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/time-checker.svg?style=flat

[travis-url]: https://travis-ci.org/ivanoff/time-checker
[travis-image]: https://travis-ci.org/ivanoff/time-checker.svg?branch=master

[appveyor-url]: https://ci.appveyor.com/project/ivanoff/time-checker/branch/master
[appveyor-image]: https://ci.appveyor.com/api/projects/status/lp3nhnam1eyyqh33/branch/master?svg=true

[coveralls-url]: https://coveralls.io/github/ivanoff/time-checker?branch=master
[coveralls-image]: https://coveralls.io/repos/github/ivanoff/time-checker/badge.svg?branch=master
