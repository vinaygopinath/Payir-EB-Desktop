'use strict';

/**
 * @ngdoc function
 * @name Payir-EB-Desktop-App.controller:NewCustomerCtrl
 * @description
 * # NewCustomerCtrl
 * Controller of the Payir-EB-Desktop-App
 */
angular.module('Payir-EB-Desktop-App')
    .controller('NewCustomerCtrl', function ($scope, DBService, VldService, $filter, $timeout) {
        $scope.cust = {};
        $scope.hasInpError = false;
        $scope.saveSucc = false;
        $scope.saveFailed = false;

        $scope.clearCustomer = function () {
            $scope.cust = {};
        };

        $scope.saveCustomer = function () {
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
                    $scope.isSaved = true;
                    $timeout(function () {
                        $scope.isSaved = false;
                    }, 5000);
                }, function (err) {
                    console.log("Errorred: ", err);
                });
            } else {
                console.log("Customer data is not valid");
                console.log("Before: ", $scope.hasInpError);
                $scope.hasInpError = true;
                console.log("After: ", $scope.hasInpError);
                $timeout(function () {
                    $scope.hasInpError = false;
                    console.log("After sometime: ", $scope.hasInpError);
                }, 5000);
            }
        };
    });