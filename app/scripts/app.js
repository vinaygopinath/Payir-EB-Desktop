angular.module('Payir-EB-Desktop-App', [
'ngRoute',
'ngMessages',
'ngAnimate'
]).config(function ($routeProvider) {
        $routeProvider
            .when('/customer/new', {
                templateUrl: 'views/newcustomer.html',
                controller: 'NewCustomerCtrl'
            })
            .when('/payment/new', {
                templateUrl: 'views/newpayment.html',
                controller: 'NewPaymentCtrl'
            })
            .when('/report/individual', {
                templateUrl: 'views/individualreport-search.html',
                controller: 'IndividualReportSearchCtrl'
            })
            .when('/report/individual/:serviceNo', {
                templateUrl: 'views/individualreport.html',
                controller: 'IndividualReportCtrl'
            })
            .when('/report/time', {
                templateUrl: 'views/timereport.html',
                controller: 'TimeReportCtrl'
            })
            .when('/report/paymentdue', {
                templateUrl: 'views/paymentduereport.html',
                controller: 'PaymentDueReportCtrl'
            })
            .when('/report/notpaid', {
                templateUrl: 'views/notpaidreport.html',
                controller: 'NotPaidReportCtrl'
            })
            .when('/intro', {
                templateUrl: 'views/intro.html',
                controller: 'IntroCtrl'
            })
            .otherwise({
                redirectTo: '/intro'
            });
    })
    .run(['$rootScope', function ($rootScope) {
        $rootScope.showReports = false;
        $rootScope.toggleReports = function () {
            console.log("Toggling report");
            $rootScope.showReports = !$rootScope.showReports;
        }
    }]);