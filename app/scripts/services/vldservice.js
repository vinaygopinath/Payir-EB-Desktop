'use strict';

/**
 * @ngdoc service
 * @name Payir-EB-Desktop-App.VldService
 * @description
 * # VldService
 * Service in the Payir-EB-Desktop-App.
 */
angular.module('Payir-EB-Desktop-App')
    .service('VldService', function Vldservice() {
        // AngularJS will instantiate a singleton by calling "new" on this function

        function isValidCustomer(cust, dueDate) {
            console.log("serviceNo = ", cust.serviceNo);
            console.log("name", cust.name);
            console.log("dueDate = ", cust.dueDate);
            console.log("village = ", cust.village);
            return (cust.serviceNo && cust.serviceNo.length >= 5 && cust.name && cust.name.length >= 3 && dueDate && cust.village);
        }

        function isValidPayment(payment, tempDate) {
            console.log("Payment = ", payment);
            console.log("Temp date = ", tempDate);
            return (payment.serviceNo && payment.serviceNo.length >= 5 && payment.amount && tempDate);
        }

        function isValidIndReportSearch(search) {
            if (search.serviceNo && search.serviceNo.length >= 5) {

            }
        }

        return {
            "isValidCustomer": isValidCustomer,
            "isValidPayment": isValidPayment,
            "isValidIndReportSearch": isValidIndReportSearch
        }
    });