'use strict';

/**
 * @ngdoc function
 * @name packageApp.controller:TimereportCtrl
 * @description
 * # TimereportCtrl
 * Controller of the packageApp
 */
angular.module('Payir-EB-Desktop-App')
    .controller('TimeReportCtrl', function ($scope, DBService, $filter, VldService, $timeout) {

        $scope.range = {};

        $scope.today = new Date();

        $scope.searchTimeReport = function () {
            $scope.timeReportRows = undefined;
            $scope.hasError = false;
            $scope.isInvalidSearch = false;
            if (VldService.isValidTimeReportSearch($scope.range)) {
                var searchRange = {};
                searchRange.startDate = $filter('date')($scope.range.startDate, 'yyyy-MM-dd');
                searchRange.endDate = $filter('date')($scope.range.endDate, 'yyyy-MM-dd');

                DBService.getTimeReport(searchRange).then(function (result) {
                    $scope.custCount = result.custCount;
                    $scope.paymentCount = result.paymentCount;
                    $scope.totalAmount = result.totalAmount;
                    $scope.timeReportRows = result.tableRows;
                }, function (err) {
                    console.log(err);
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
    });