'use strict';

/**
 * @ngdoc function
 * @name packageApp.controller:PaymentduereportCtrl
 * @description
 * # PaymentduereportCtrl
 * Controller of the packageApp
 */
angular.module('Payir-EB-Desktop-App')
    .controller('PaymentDueReportCtrl', function ($scope, DBService, $location) {
        DBService.getPaymentDueReport().then(function (succ) {
            console.log('Succ = ', succ);
            $scope.paymentDueRows = succ;
        }, function () {
            //console.log('error = ', err);
        });

        $scope.openCustomerInfo = function (serviceNo) {
            $location.path('/report/individual/' + serviceNo);
        };
    });