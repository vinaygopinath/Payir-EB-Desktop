'use strict';

describe('Service: DBStrings', function () {

    // load the service's module
    beforeEach(module('Payir-EB-Desktop-App'));

    // instantiate service
    var DBStrings;
    beforeEach(inject(function (_DBStrings_) {
        DBStrings = _DBStrings_;
    }));

    it('should do something', function () {
        expect(!!DBStrings).toBe(true);
    });

});