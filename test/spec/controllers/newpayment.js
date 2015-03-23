'use strict';

describe('Controller: NewPaymentCtrl', function () {
  
  // load the controller's module
  beforeEach(module('Payir-EB-Desktop-App'));
  
  var NewPaymentCtrl,
  scope;
  
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewPaymentCtrl = $controller('NewPaymentCtrl', {
      $scope: scope
    });
  }));
});
