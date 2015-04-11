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
    .run(['$rootScope', 'DBService', 'VldService', '$http', function ($rootScope, DBService, VldService, $http) {
        $rootScope.showReports = false;
        $rootScope.toggleReports = function () {
            console.log("Toggling report");
            $rootScope.showReports = !$rootScope.showReports;
        };

        // Load native UI library
        var gui = require('nw.gui');
        var win = gui.Window.get();
        var tray;

        // Show the app window and remove the tray icon
        function showWindow() {
            win.show();
            tray.remove();
            tray = null;
        }

        // Minimize the app window and show the tray (and tray menu)
        function minimizeToTray() {
            // Hide window
            win.hide();

            // Show tray
            tray = new gui.Tray({
                title: 'Payir EB Data Management',
                tooltip: 'Payir Data Management - Running',
                icon: 'images/icon.png'
            });

            var showAppItem = new gui.MenuItem({
                label: 'Show App',
                click: function () {
                    showWindow();
                }
            });

            var quitAppItem = new gui.MenuItem({
                label: 'Quit',
                click: function () {
                    gui.App.quit();
                }
            });

            var trayMenu = new gui.Menu();
            trayMenu.append(showAppItem);
            trayMenu.append(quitAppItem);

            tray.menu = trayMenu;

            // Show window and remove tray when clicked
            tray.on('click', function () {
                showWindow();
            });
        }

        // Keep app running in tray on minimize or close
        win.on('minimize', function () {
            minimizeToTray();
        });

        win.on('close', function () {
            minimizeToTray();
        });


        var http = require("http");
        var url = require("url");
        var server = http.createServer(function (req, res) {

            req.on('data', function (chunk) {
                try {
                    //TODO Check endpoint
                    //TODO Set up error codes for every possible error
                    var paymentInfo = JSON.parse(chunk);
                    console.log("Received object = ", paymentInfo);
                    if (VldService.isValidPayment(paymentInfo)) {
                        console.log("Valid payment");
                        DBService.savePayment(paymentInfo).then(function (succ) {
                            res.statusCode = 200;
                            return res.end("Saved!");
                        }, function (err) {
                            res.statusCode = 400;
                            return res.end("Unable to save! " + err);
                        });
                    } else {
                        res.statusCode = 400;
                        return res.end("Invalid PaymentInfo object");
                    }
                } catch (err) {
                    res.statusCode = 400;
                    return res.end("JSON parsing error! " + err.message);
                }
            });

            req.on('end', function () {
                console.log("End was called");
            })


        });
        //TODO Use alternate port address in case of conflict
        //Also modify Chrome extension to check alternate port
        server.listen(5555);
    }]);