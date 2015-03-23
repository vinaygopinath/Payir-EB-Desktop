'use strict';

describe('Controller: IndividualReportCtrl', function () {
  
  // load the controller's module
  beforeEach(module('Payir-EB-Desktop-App'));
  
  var IndividualReportCtrl,
  scope;
  
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndividualReportCtrl = $controller('IndividualReportCtrl', {
      $scope: scope
    });
  }));
});
