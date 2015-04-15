'use strict';

/**
 * @ngdoc function
 * @name Payir-EB-Desktop-App.controller:IndividualreportCtrl
 * @description
 * # IndividualreportCtrl
 * Controller of the packageApp
 */
angular.module('Payir-EB-Desktop-App')
    .controller('IndividualReportCtrl', function ($scope, $routeParams, DBService, $filter, $location) {

        if (!$routeParams.serviceNo) {
            $scope.hasNoCust = true;
            return;
        }

        $scope.isLoadingCust = true;

        DBService.getCustomer($routeParams.serviceNo).then(function (cust) {
            console.log("Received customer object = ", cust);
            $scope.isLoadingCust = false;
            $scope.cust = cust;
            if (!cust) {
                $scope.hasNoCust = true;
            }
        }, function (err) {
            console.log("Error = ", err);
            $scope.isLoadingCust = false;
            $scope.hasCustError = true;
        });

        $scope.isLoadingHist = true;
        DBService.getPaymentHistory($routeParams.serviceNo).then(function (payments) {
            console.log("Received payment history = ", payments);
            $scope.isLoadingHist = false;
            if (payments && payments.length > 0) {
                $scope.payments = payments;
            } else {
                $scope.hasNoHist = true;
            }
        }, function (err) {
            console.log("Payment history error = ", err);
            $scope.isLoadingHist = false;
            $scope.hasHistError = true;
        });

        $scope.deleteCustomer = function () {
            //TODO Show dialog and receive confirmation 
            //Dialog message: Are you sure you want to delete all details of <name>?
            // Warning: This will delete their details and their payment history

            DBService.deleteCustomer($scope.cust.serviceNo).then(function (succ) {
                console.log("Successfully deleted customer ", succ);
            }, function (err) {
                console.log(err);
            })
        };

        $scope.editCustomer = function () {
            $location.path('/customer/edit/' + $routeParams.serviceNo);
        }
    });