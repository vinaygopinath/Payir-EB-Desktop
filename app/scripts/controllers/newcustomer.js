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
        $scope.villages = [];

        if ($routeParams.serviceNo) {
            $scope.isEditing = true;
            DBService.getCustomer($routeParams.serviceNo).then(function (cust) {
                $scope.cust = cust.raw;
                console.log("Raw customer object = ", cust);

                if (cust.raw.dateOfBirth) {
                    $scope.tempDateOfBirth = new Date(cust.raw.dateOfBirth);
                    $scope.cust.dateOfBirth = cust.dateOfBirth;
                }
                if (cust.raw.dateOfJoining) {
                    $scope.tempDateOfJoining = new Date(cust.raw.dateOfJoining);
                    $scope.cust.dateOfJoining = cust.dateOfJoining;
                }
                $scope.cust.dueDate = cust.dueDate;
                $scope.tempDueDate = new Date(cust.raw.dueDate);
                console.log("Processed customer = ", $scope.cust);
                console.log("Processed tempDD = ", $scope.tempDueDate);
                console.log("Processed tempDoJ = ", $scope.tempDateOfJoining);
                console.log("Processed tempDoB = ", $scope.tempDateOfBirth);
            }, function (err) {
                console.log("Error while fetching customer for editing");
                //TODO Show error dialog?
            });
        }

        DBService.getDistinctVillages().then(function (villages) {
            $scope.villages = villages;
        }, function (err) {
            console.log("Error = ", err);
            //TODO Do nothing here?
        })

        $scope.clearCustomer = function () {
            $scope.cust = {};

            $scope.tempDateOfBirth = undefined;
            $scope.tempDueDate = undefined;
            $scope.tempDateOfJoining = undefined;
        };

        $scope.saveCustomer = function () {
            if (VldService.isValidCustomer($scope.cust, $scope.tempDueDate)) {
                console.log("TempDueDate = ", $scope.tempDueDate);
                console.log("tempDateOfBirth = ", $scope.tempDateOfBirth);
                console.log("tempDateOfJoining = ", $scope.tempDateOfJoining);
                $scope.cust.dueDate = $filter("date")($scope.tempDueDate, "yyyy-MM-dd");

                if ($scope.tempDateOfBirth) {
                    $scope.cust.dateOfBirth = $filter("date")($scope.tempDateOfBirth, "yyyy-MM-dd");
                } else if ($scope.isEditing) {
                    $scope.cust.dateOfBirth = null;
                }

                if ($scope.tempDateOfJoining) {
                    $scope.cust.dateOfJoining = $filter("date")($scope.tempDateOfJoining, "yyyy-MM-dd");
                } else if ($scope.isEditing) {
                    $scope.cust.dateOfJoining = null;
                }

                var apprFunc = ($scope.isEditing) ? DBService.updateCustomer : DBService.saveCustomer;
                apprFunc($scope.cust).then(function (succ) {
                    console.log("Successfully saved customer!");
                    $scope.saveSucc = true;
                    $scope.clearCustomer();
                    $timeout(function () {
                        $scope.saveSucc = false;
                    }, 5000);
                }, function (err) {
                    $scope.saveFailed = true;
                });
            } else {
                $scope.hasInpError = true;
                $timeout(function () {
                    $scope.hasInpError = false;
                }, 5000);
            }
        };
    });