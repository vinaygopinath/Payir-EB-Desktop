'use strict';

/**
 * @ngdoc function
 * @name packageApp.controller:NewpaymentCtrl
 * @description
 * # NewpaymentCtrl
 * Controller of the packageApp
 */
angular.module('Payir-EB-Desktop-App')
    .controller('NewPaymentCtrl', function ($scope, VldService, DBService, $filter) {

        $scope.payment = {};

        $scope.savePayment = function () {
            console.log("Payment = ", $scope.payment);
            console.log("Date = ", $scope.tempPaymentDate);
            if (VldService.isValidPayment($scope.payment, $scope.tempPaymentDate)) {
                $scope.payment.paymentDate = $filter("date")($scope.tempPaymentDate, "yyyy-MM-dd");

                console.log("Inside savePayment");
                DBService.savePayment($scope.payment).then(function (suc) {
                    console.log("Successfully saved bill payment!");
                }, function (err) {
                    console.log("Error! ", err);
                });
            }
        };

        $scope.clearPayment = function () {
            $scope.payment = {};
            console.log("$scope.tempPaymentDate = ", $scope.tempPaymentDate);
        };
    });