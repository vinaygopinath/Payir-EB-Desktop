'use strict';

describe('Controller: NotPaidReportCtrl', function () {
  
  // load the controller's module
  beforeEach(module('Payir-EB-Desktop-App'));
  
  var NotPaidReportCtrl,
  scope;
  
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotPaidReportCtrl = $controller('NotPaidReportCtrl', {
      $scope: scope
    });
  }));
});
