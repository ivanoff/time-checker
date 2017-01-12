'use strict';

var CheckTime = require('../index');

var options = {
  daysOff: [ 0, 7 ],
  holidays: [ '1.01', '7.01' ],
  timeZone: 'Etc/GMT'
};

describe('checkTime', function() {

  describe('allways true', function() {
    var checkTime = new CheckTime();
    it('no conditions', function() {
      checkTime.byConditions().should.equal(true);
    });
    it('00:00-23:59', function() {
      checkTime.byConditions('00:00-23:59').should.equal(true);
    });
  });

  describe('allways false', function() {
    var checkTime = new CheckTime();
    it('00:00-00:00', function() {
      checkTime.byConditions('00:00-00:00').should.equal(false);
    });
  });

  describe('1465211606000 => Mon Jun 06 11:13:26 2016', function() {
    var checkTime = new CheckTime(options);
    it('9:00-17:00 string', function() {
      checkTime.byConditions('9:00-17:00', 1465211606000).should.equal(true);
    });
    it('9:00-17:00', function() {
      checkTime.byConditions(['9:00-17:00'], 1465211606000).should.equal(true);
    });
    it('9:00-12:00', function() {
      checkTime.byConditions(['9:00-12:00'], 1465211606000).should.equal(true);
    });
    it('11:00-12:00', function() {
      checkTime.byConditions(['11:00-12:00'], 1465211606000).should.equal(true);
    });
    it('9:00-11:00', function() {
      checkTime.byConditions(['9:00-11:00'], 1465211606000).should.equal(false);
    });
    it('12:00-17:00', function() {
      checkTime.byConditions(['12:00-17:00'], 1465211606000).should.equal(false);
    });
    it('9:00-10:00, 11:00-12:00', function() {
      checkTime.byConditions(['9:00-10:00','11:00-12:00'], 1465211606000).should.equal(true);
    });
    it('9:00-11:00, 12:00-17:00', function() {
      checkTime.byConditions(['9:00-11:00','12:00-17:00'], 1465211606000).should.equal(false);
    });
    it('workdays', function() {
      checkTime.byConditions(['workdays'], 1465211606000).should.equal(true);
    });
    it('11:00-12:00, workdays', function() {
      checkTime.byConditions(['11:00-12:00','workdays'], 1465211606000).should.equal(true);
    });
    it('9:00-11:00, workdays', function() {
      checkTime.byConditions(['9:00-11:00','workdays'], 1465211606000).should.equal(false);
    });
    it('workdays, 11:00-12:00', function() {
      checkTime.byConditions(['workdays','11:00-12:00'], 1465211606000).should.equal(true);
    });
    it('workdays, 9:00-11:00', function() {
      checkTime.byConditions(['workdays','9:00-11:00'], 1465211606000).should.equal(false);
    });
    it('workdays, 11:00-12:00, workdays', function() {
      checkTime.byConditions(['workdays','11:00-12:00','workdays'], 1465211606000).should.equal(true);
    });
    it('workdays, 9:00-11:00, workdays', function() {
      checkTime.byConditions(['workdays','9:00-11:00','workdays'], 1465211606000).should.equal(false);
    });
    it('11:00-12:00, workdays, 11:00-12:00', function() {
      checkTime.byConditions(['11:00-12:00','workdays','11:00-12:00'], 1465211606000).should.equal(true);
    });
    it('9:00-11:00, workdays, 9:00-11:00', function() {
      checkTime.byConditions(['9:00-11:00','workdays','9:00-11:00'], 1465211606000).should.equal(false);
    });
    it('restdays', function() {
      checkTime.byConditions(['restdays'], 1465211606000).should.equal(false);
    });
  });

  describe('1465125226000 => Sun Jun 05 11:13:06 2016', function() {
    var checkTime = new CheckTime(options);
    it('restdays', function() {
      checkTime.byConditions(['restdays'], 1465125226000).should.equal(true);
    });
    it('11:00-12:00, restdays', function() {
      checkTime.byConditions(['11:00-12:00','restdays'], 1465125226000).should.equal(true);
    });
    it('9:00-11:00, restdays', function() {
      checkTime.byConditions(['9:00-11:00','restdays'], 1465125226000).should.equal(false);
    });
    it('restdays, 11:00-12:00', function() {
      checkTime.byConditions(['restdays','11:00-12:00'], 1465125226000).should.equal(true);
    });
    it('restdays, 9:00-11:00', function() {
      checkTime.byConditions(['restdays','9:00-11:00'], 1465125226000).should.equal(false);
    });
    it('restdays, 11:00-12:00, restdays', function() {
      checkTime.byConditions(['restdays','11:00-12:00','restdays'], 1465125226000).should.equal(true);
    });
    it('restdays, 9:00-11:00, restdays', function() {
      checkTime.byConditions(['restdays','9:00-11:00','restdays'], 1465125226000).should.equal(false);
    });
    it('11:00-12:00, restdays, 11:00-12:00', function() {
      checkTime.byConditions(['11:00-12:00','restdays','11:00-12:00'], 1465125226000).should.equal(true);
    });
    it('9:00-11:00, restdays, 9:00-11:00', function() {
      checkTime.byConditions(['9:00-11:00','restdays','9:00-11:00'], 1465125226000).should.equal(false);
    });
  });

  describe('1465125606000 => Sun Jun 05 11:20:06 2016', function() {
    var checkTime = new CheckTime(options);
    it('9:00-17:00', function() {
      checkTime.byConditions(['9:00-17:00'], 1465125606000).should.equal(true);
    });
    it('9:00-12:00', function() {
      checkTime.byConditions(['9:00-12:00'], 1465125606000).should.equal(true);
    });
    it('11:00-12:00', function() {
      checkTime.byConditions(['11:00-12:00'], 1465125606000).should.equal(true);
    });
    it('9:00-11:00', function() {
      checkTime.byConditions(['9:00-11:00'], 1465125606000).should.equal(false);
    });
    it('12:00-17:00', function() {
      checkTime.byConditions(['12:00-17:00'], 1465125606000).should.equal(false);
    });
    it('9:00-10:00, 11:00-12:00', function() {
      checkTime.byConditions(['9:00-10:00','11:00-12:00'], 1465125606000).should.equal(true);
    });
    it('9:00-11:00, 12:00-17:00', function() {
      checkTime.byConditions(['9:00-11:00','12:00-17:00'], 1465125606000).should.equal(false);
    });
    it('workdays', function() {
      checkTime.byConditions(['workdays'], 1465125606000).should.equal(false);
    });
    it('11:00-12:00, workdays', function() {
      checkTime.byConditions(['11:00-12:00','workdays'], 1465125606000).should.equal(false);
    });
    it('9:00-11:00, workdays', function() {
      checkTime.byConditions(['9:00-11:00','workdays'], 1465125606000).should.equal(false);
    });
    it('workdays, 11:00-12:00', function() {
      checkTime.byConditions(['workdays','11:00-12:00'], 1465125606000).should.equal(false);
    });
    it('workdays, 9:00-11:00', function() {
      checkTime.byConditions(['workdays','9:00-11:00'], 1465125606000).should.equal(false);
    });
    it('workdays, 11:00-12:00, workdays', function() {
      checkTime.byConditions(['workdays','11:00-12:00','workdays'], 1465125606000).should.equal(false);
    });
    it('workdays, 9:00-11:00, workdays', function() {
      checkTime.byConditions(['workdays','9:00-11:00','workdays'], 1465125606000).should.equal(false);
    });
    it('11:00-12:00, workdays, 11:00-12:00', function() {
      checkTime.byConditions(['11:00-12:00','workdays','11:00-12:00'], 1465125606000).should.equal(false);
    });
    it('9:00-11:00, workdays, 9:00-11:00', function() {
      checkTime.byConditions(['9:00-11:00','workdays','9:00-11:00'], 1465125606000).should.equal(false);
    });
  });

});