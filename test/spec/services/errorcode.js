'use strict';

describe('Service: errorcodes', function () {

  // load the service's module
  beforeEach(module('packageApp'));

  // instantiate service
  var errorcodes;
  beforeEach(inject(function (_errorcodes_) {
    errorcodes = _errorcodes_;
  }));

  it('should do something', function () {
    expect(!!errorcodes).toBe(true);
  });

});
