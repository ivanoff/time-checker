# Time checker

v.0.1.1

Checks current time in a specified period


## Install

`npm install time-checker`


## Usage Example

```javascript
var CheckTime = require('time-checker');

// set Saturday and Sunday as a days off. Holidays are first and seventh of January
var checkTime = new CheckTime({ daysOff : [0, 7], holidays : ['1.01', '7.01'] });

// checking 'Mon Jun 06 11:13:26 2016' (1465200806000) on perioud '9:00-17:00'
checkTime.byConditions('9:00-17:00', 1465200806000); // true

// is Sunday is a rest day?
checkTime.byConditions('restdays', 1465200806000); // true

// is 'Mon Jun 06 11:13:26 2016' (1465114426000) is a rest day with perioud '9:00-17:00'?
checkTime.byConditions(['9:00-17:00', 'restdays'], 1465200806000); // false

// if current time is my working days free time?
checkTime.byConditions(['18:00-23:59', '00:00-10:00', 'workdays']); // it depends on current time
```


## Change Log

[all changes](CHANGELOG.md)


## Created by

Dimitry Ivanov <2@ivanoff.org.ua> # curl -A cv ivanoff.org.ua
