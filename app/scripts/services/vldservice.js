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
        // AngularJS will instantiate a singleton by calling 'new' on this function

        //TODO Check if serviceNo needs to be handled as a Number in Customer and Payment objects
        function isValidCustomer(cust, dueDate) {
            console.log('serviceNo = ', cust.serviceNo);
            console.log('serviceNo length = ', cust.serviceNo ? (cust.serviceNo + '').length : 'missing');
            console.log('name', cust.name);
            console.log('name length = ', cust.name ? cust.name.length : 'missing');
            console.log('dueDate = ', dueDate);
            console.log('village = ', cust.village);
            console.log('village length = ', cust.village ? cust.village.length : 'missing');
            return (cust.serviceNo && cust.name && cust.serviceNo.toString().length >= 5 && cust.name.length >= 3 && dueDate && cust.village && cust.village.length >= 3);
        }

        function isValidPayment(payment, tempDate) {
            if (tempDate) {
                return (payment.serviceNo && payment.serviceNo.length >= 5 && payment.amount && tempDate);
            }
            return (payment.serviceNo && payment.serviceNo.length >= 5 && payment.amount && payment.paymentDate);
        }

        function isValidIndReportSearch(search) {
            if ((search.serviceNo && search.serviceNo.trim() && search.serviceNo.trim().length >= 3) || (search.name && search.name.trim() && search.name.trim().length >= 3) || (search.village && search.village.trim() && search.village.trim().length >= 3)) {
                return true;
            }
            return false;
        }

        function isValidTimeReportSearch(search) {
            console.log('search = ', search);
            console.log('startDate = ', search.startDate && search.startDate instanceof Date);
            console.log('endDate = ', search.endDate && search.endDate instanceof Date);
            if ((search.startDate && search.startDate instanceof Date) && (search.endDate && search.endDate instanceof Date)) {
                return true;
            }
            return false;
        }

        return {
            'isValidCustomer': isValidCustomer,
            'isValidPayment': isValidPayment,
            'isValidIndReportSearch': isValidIndReportSearch,
            'isValidTimeReportSearch': isValidTimeReportSearch
        };
    });