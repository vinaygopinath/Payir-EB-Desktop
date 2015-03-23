'use strict';

describe('Controller: NewCustomerCtrl', function () {
  
  // load the controller's module
  beforeEach(module('Payir-EB-Desktop-App'));
  
  var NewCustomerCtrl,
  scope;
  
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewCustomerCtrl = $controller('NewCustomerCtrl', {
      $scope: scope
    });
  }));
});
