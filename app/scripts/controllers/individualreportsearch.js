'use strict';

/**
 * @ngdoc function
 * @name Payir-EB-Desktop-App.controller:IndividualReportSearchCtrl
 * @description
 * # IndividualReportSearchCtrl
 * Controller of the Payir-EB-Desktop-App
 */
angular.module('Payir-EB-Desktop-App')
    .controller('IndividualReportSearchCtrl', function ($scope, VldService) {

        $scope.search = {};

        $scope.search = function () {
            if (VldService.isValidIndReportSearch($scope.search)) {

            }
        };

        $scope.clearSearch = function () {
            $scope.search = {};
        };
    });