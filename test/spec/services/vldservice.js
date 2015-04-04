'use strict';

describe('Service: VldService', function () {

    // load the service's module
    beforeEach(module('Payir-EB-Desktop-App'));

    // instantiate service
    var VldService;
    beforeEach(inject(function (_VldService_) {
        VldService = _VldService_;
    }));

    it('should do something', function () {
        expect(!!VldService).toBe(true);
    });

});