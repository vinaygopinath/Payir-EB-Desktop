'use strict';

describe('Controller: PaymentduereportCtrl', function () {
  
  // load the controller's module
  beforeEach(module('Payir-EB-Desktop-App'));
  
  var PaymentDueReportCtrl,
  scope;
  
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PaymentDueReportCtrl = $controller('PaymentDueReportCtrl', {
      $scope: scope
    });
  }));
});
