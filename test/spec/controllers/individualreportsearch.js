'use strict';

describe('Controller: IndividualReportSearchCtrl', function () {

    // load the controller's module
    beforeEach(module('Payir-EB-Desktop-App'));

    var IndividualReportSearchCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        IndividualReportSearchCtrl = $controller('IndividualReportSearchCtrl', {
            $scope: scope
        });
    }));

});