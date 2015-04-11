'use strict';

/**
 * @ngdoc function
 * @name Payir-EB-Desktop-App.controller:IndividualReportSearchCtrl
 * @description
 * # IndividualReportSearchCtrl
 * Controller of the Payir-EB-Desktop-App
 */
angular.module('Payir-EB-Desktop-App')
    .controller('IndividualReportSearchCtrl', function ($scope, VldService, DBService, $location) {

        $scope.search = {};

        $scope.runSearch = function () {
            console.log("Inside search()");
            if (VldService.isValidIndReportSearch($scope.search)) {
                console.log("Validation returned true");
                DBService.searchCustomers($scope.search).then(function (results) {
                    $scope.results = {};
                    if (results && results.length > 0) {
                        $scope.results = results;
                    } else {
                        //TODO Show "No results found" message
                    }
                }, function (err) {
                    $scope.results = {};
                    console.log(err);
                });
            } else {
                console.log("Validation returned false");
            }
        };

        $scope.openCustomerInfo = function (custServiceNo) {
            $location.path('/report/individual/' + custServiceNo);
        };

        $scope.clearSearch = function () {
            $scope.search = {};
        };
    });