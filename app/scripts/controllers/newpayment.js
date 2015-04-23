'use strict';

/**
 * @ngdoc function
 * @name packageApp.controller:NewpaymentCtrl
 * @description
 * # NewpaymentCtrl
 * Controller of the packageApp
 */
angular.module('Payir-EB-Desktop-App')
    .controller('NewPaymentCtrl', function ($scope, VldService, DBService, $filter, $timeout) {

        DBService.getServiceNos().then(function (results) {
            console.log("ServiceNos = ", results);
            $scope.serviceNos = results;
        }, function (err) {
            console.log(err);
        })

        $scope.payment = {};

        $scope.savePayment = function () {
            console.log("Payment = ", $scope.payment);
            console.log("Date = ", $scope.tempPaymentDate);
            if (VldService.isValidPayment($scope.payment, $scope.tempPaymentDate)) {
                $scope.payment.paymentDate = $filter("date")($scope.tempPaymentDate, "yyyy-MM-dd");

                console.log("Inside savePayment");
                DBService.savePayment($scope.payment).then(function () {
                    return DBService.updateDueDate($scope.payment);
                }).then(function (suc) {
                    //console.log("Successfully saved bill payment!");
                    $scope.saveSucc = true;
                    $scope.clearPayment();
                    $timeout(function () {
                        $scope.saveSucc = false;
                    }, 5000);
                }, function (err) {
                    //console.log("Error! ", err);
                    $scope.saveFailed = true;
                });
            } else {
                $scope.hasInpError = true;
                $timeout(function () {
                    $scope.hasInpError = false;
                }, 5000);
            }
        };

        $scope.clearPayment = function () {
            $scope.payment = {};
            $scope.tempPaymentDate = undefined;
            console.log("$scope.tempPaymentDate = ", $scope.tempPaymentDate);
        };
    });