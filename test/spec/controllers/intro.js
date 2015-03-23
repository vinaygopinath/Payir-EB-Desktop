'use strict';

describe('Controller: IntroctrlCtrl', function () {
  
  // load the controller's module
  beforeEach(module('Payir-EB-Desktop-App'));
  
  var IntrolCtrl,
  scope;
  
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroCtrl = $controller('IntroCtrl', {
      $scope: scope
    });
  }));
});
