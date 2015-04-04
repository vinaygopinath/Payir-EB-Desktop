'use strict';

describe('Service: DBService', function () {

    // load the service's module
    beforeEach(module('Payir-EB-Desktop-App'));

    // instantiate service
    var DBService;
    beforeEach(inject(function (_DBService_) {
        DBService = _DBService_;
    }));

    it('should do something', function () {
        expect(!!DBService).toBe(true);
    });

});