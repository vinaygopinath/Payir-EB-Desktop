'use strict';

/**
 * @ngdoc function
 * @name Payir-EB-Desktop-App.controller:IndividualReportSearchCtrl
 * @description
 * # IndividualReportSearchCtrl
 * Controller of the Payir-EB-Desktop-App
 */
angular.module('Payir-EB-Desktop-App')
    .controller('IndividualReportSearchCtrl', function ($scope, VldService, DBService, $location, $timeout) {

        $scope.search = {};

        $scope.runSearch = function () {
            console.log("Inside search()");
            if (VldService.isValidIndReportSearch($scope.search)) {
                console.log("Validation returned true");
                $scope.isLoading = true;
                DBService.searchCustomers($scope.search).then(function (results) {
                    $scope.isLoading = false;
                    if (results && results.length > 0) {
                        $scope.results = results;
                    } else {
                        $scope.results = undefined;
                        $scope.hasNoResults = true;
                        $timeout(function () {
                            $scope.hasNoResults = false;
                        }, 5000);
                    }
                }, function (err) {
                    $scope.isLoading = false;
                    $scope.results = undefined;
                    $scope.hasError = true;
                    $timeout(function () {
                        $scope.hasError = false;
                    }, 5000);
                });
            } else {
                $scope.isInvalidSearch = true;
                $timeout(function () {
                    $scope.isInvalidSearch = false;
                }, 5000);
            }
        };

        $scope.openCustomerInfo = function (custServiceNo) {
            $location.path('/report/individual/' + custServiceNo);
        };

        $scope.clearSearch = function () {
            $scope.search = {};
            $scope.results = undefined;
            $scope.isInvalidSearch = false;
        };
    });