'use strict';

/**
 * @ngdoc function
 * @name packageApp.controller:NotpaidreportCtrl
 * @description
 * # NotpaidreportCtrl
 * Controller of the packageApp
 */
angular.module('Payir-EB-Desktop-App')
    .controller('NotPaidReportCtrl', function ($scope, DBService, $location) {

        $scope.isLoading = true;
        DBService.getNotPaidReport().then(function (resultRows) {
            $scope.isLoading = false;
            console.log('Received not paid report ', resultRows);
            $scope.notPaidRows = resultRows;
            if (resultRows.length === 0) {
                $scope.hasNoResults = true;
            }
        }, function (err) {
            $scope.isLoading = false;
            $scope.hasError = true;
            console.log(err);
        });

        $scope.openCustomerInfo = function (serviceNo) {
            $location.path('/report/individual/' + serviceNo);
        };
    });