'use strict';

/**
 * @ngdoc function
 * @name Payir-EB-Desktop-App.controller:IndividualreportCtrl
 * @description
 * # IndividualreportCtrl
 * Controller of the packageApp
 */
angular.module('Payir-EB-Desktop-App')
    .controller('IndividualReportCtrl', function ($scope, $routeParams, DBService, $filter) {

        $scope.fetchedCust = false;
        $scope.hasCustError = false;
        $scope.fetchedHist = false;
        $scope.hasHistError = false;

        if (!$routeParams.serviceNo) {
            return;
        }

        DBService.getCustomer($routeParams.serviceNo).then(function (cust) {
            console.log("Received customer object = ", cust);
            $scope.fetchedCust = true;
            $scope.cust = cust;
        }, function (err) {
            console.log("Error = ", err);
            $scope.fetchedCust = true;
            $scope.hasCustError = true;
        });

        DBService.getPaymentHistory($routeParams.serviceNo).then(function (payments) {
            console.log("Received payment history = ", payments);
            $scope.fetchedHist = true;
            if (payments && payments.length > 0) {
                $scope.payments = payments;
            }
        }, function (err) {
            console.log("Payment history error = ", err);
            $scope.fetchedHist = true;
            $scope.hasHistError = true;
        })
    });