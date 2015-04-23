'use strict';

/**
 * @ngdoc function
 * @name Payir-EB-Desktop-App.controller:IndividualreportCtrl
 * @description
 * # IndividualreportCtrl
 * Controller of the packageApp
 */
angular.module('Payir-EB-Desktop-App')
    .controller('IndividualReportCtrl', function ($scope, $routeParams, DBService, $filter, $location, ngDialog) {

        if (!$routeParams.serviceNo) {
            $scope.hasNoCust = true;
            return;
        }

        $scope.isLoadingCust = true;

        DBService.getCustomer($routeParams.serviceNo).then(function (cust) {
            console.log('Received customer object = ', cust);
            $scope.isLoadingCust = false;
            $scope.cust = cust;
            if (!cust) {
                $scope.hasNoCust = true;
            }
        }, function () {
            $scope.isLoadingCust = false;
            $scope.hasCustError = true;
        });

        $scope.isLoadingHist = true;
        DBService.getPaymentHistory($routeParams.serviceNo).then(function (payments) {
            console.log('Received payment history = ', payments);
            $scope.isLoadingHist = false;
            if (payments && payments.length > 0) {
                $scope.payments = payments;
            } else {
                $scope.hasNoHist = true;
            }
        }, function () {
            //console.log('Payment history error = ', err);
            $scope.isLoadingHist = false;
            $scope.hasHistError = true;
        });

        //Reference: http://archugs.blogspot.in/2014/12/angularjs-ngDialog.html
        $scope.deleteCustomer = function () {

            ngDialog.openConfirm({
                scope: $scope,
                template: 'views/confirm-delete.html'
            }).then(function (val) {
                if (val === 1) {
                    DBService.deleteCustomer($scope.cust.serviceNo).then(function (succ) {
                        console.log('Successfully deleted customer ', succ);
                    }, function (err) {
                        console.log(err);
                    });
                }
            }, function () {
                console.log('Received NO');
            });
        };

        $scope.editCustomer = function () {
            $location.path('/customer/edit/' + $routeParams.serviceNo);
        };
    });