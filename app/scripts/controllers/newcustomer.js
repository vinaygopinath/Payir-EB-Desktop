'use strict';

/**
 * @ngdoc function
 * @name Payir-EB-Desktop-App.controller:NewCustomerCtrl
 * @description
 * # NewCustomerCtrl
 * Controller of the Payir-EB-Desktop-App
 */
angular.module('Payir-EB-Desktop-App')
    .controller('NewCustomerCtrl', function ($scope, DBService, VldService, $filter) {
        $scope.cust = {};

        $scope.clearCustomer = function () {
            $scope.cust = {};
        };

        $scope.saveCustomer = function () {
            console.log("saveCustomer");
            console.log("TempDueDate =", $scope.tempDueDate);
            if (VldService.isValidCustomer($scope.cust, $scope.tempDueDate)) {
                $scope.cust.dueDate = $filter("date")($scope.tempDueDate, "yyyy-MM-dd");

                if ($scope.tempDateOfBirth) {
                    $scope.cust.dateOfBirth = $filter("date")($scope.tempDateOfBirth, "yyyy-MM-dd");
                }

                if ($scope.tempDateOfJoining) {
                    $scope.cust.dateOfJoining = $filter("date")($scope.tempDateOfJoining, "yyyy-MM-dd");
                }

                console.log("inside isValid");
                DBService.saveCustomer($scope.cust).then(function (succ) {
                    console.log("Successfully saved customer!");
                }, function (err) {
                    console.log("Errorred: ", err);
                });
            }
        };
    });