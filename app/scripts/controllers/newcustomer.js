'use strict';

/**
 * @ngdoc function
 * @name Payir-EB-Desktop-App.controller:NewCustomerCtrl
 * @description
 * # NewCustomerCtrl
 * Controller of the Payir-EB-Desktop-App
 */
angular.module('Payir-EB-Desktop-App')
    .controller('NewCustomerCtrl', function ($scope, DBService, VldService, $filter, $timeout, $routeParams) {
        $scope.cust = {};
        $scope.hasInpError = false;
        $scope.saveSucc = false;
        $scope.saveFailed = false;

        if ($routeParams.serviceNo) {
            $scope.isEditing = true;
            DBService.getCustomer($routeParams.serviceNo).then(function (cust) {
                $scope.cust = cust.raw;
                //TODO Find out how to convert MySQL date to HTML5 input date
                $scope.cust.dueDate = $filter("date")(cust.dueDate, "yyyy-MM-dd");
                $scope.tempDueDate = new Date(cust.dueDate);
                if (cust.dateOfBirth) {
                    $scope.tempDateOfBirth = new Date(cust.dateOfBirth);
                    $scope.cust.dateOfBirth = $filter("date")(cust.dateOfBirth, "yyyy-MM-dd");
                }
                if (cust.dateOfJoining) {
                    $scope.tempDateOfJoining = new Date(cust.dateOfJoining);
                    $scope.cust.dateOfJoining = $filter("date")(cust.dateOfJoining, "yyyy-MM-dd");
                }
                console.log("Get customer = ", $scope.cust);
            }, function (err) {
                console.log("Error while fetching customer for editing");
                //TODO Show error dialog?
            });
        }

        DBService.getDistinctVillages().then(function (succ) {
            console.log("Received villages = ", succ);
            $scope.villageRows = succ;
        }, function (err) {
            console.log("Error = ", err);
            //TODO Do nothing here?
        })

        $scope.clearCustomer = function () {
            if ($scope.isEditing) {
                var sNo = $scope.cust.serviceNo;
                $scope.cust = {};
                $scope.cust.serviceNo = sNo;
            } else {
                $scope.cust = {};
            }

            $scope.tempDateOfBirth = undefined;
            $scope.tempDueDate = undefined;
            $scope.tempDateOfJoining = undefined;
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
                var apprFunc = ($scope.isEditing) ? DBService.updateCustomer : DBService.saveCustomer;
                apprFunc($scope.cust).then(function (succ) {
                    console.log("Successfully saved customer!");
                    $scope.isSaved = true;
                    $scope.clearCustomer();
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