angular.module('Payir-EB-Desktop-App', [
    'ngRoute',
    'ngMessages',
    'ngAnimate',
    'autocomplete',
    'ngDialog'
]).config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/customer/new', {
                templateUrl: 'views/newcustomer.html',
                controller: 'NewCustomerCtrl'
            })
            .when('/customer/edit/:serviceNo', {
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
                templateUrl: 'views/intro.html'
            })
            .otherwise({
                redirectTo: '/intro'
            });
    })
    .run(['$rootScope', 'DBService', 'VldService', '$http', 'ErrorCode', function ($rootScope, DBService, VldService, $http, ErrorCode) {
        'use strict';
        $rootScope.showReports = false;
        $rootScope.toggleReports = function () {
            console.log('Toggling report');
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

        function formatError(sqlError) {
            console.log('Sending error = ', sqlError);
            var errResponse = {};
            errResponse.errNo = sqlError.errno;
            if (!errResponse.errNo) {
                errResponse.custom = true;
                if (sqlError.toString().indexOf('ECONNREFUSED') !== -1) {
                    errResponse.errNo = ErrorCode.CONN_REFUSED;
                }
            }
            return JSON.stringify(errResponse);
        }

        //        var mockPayment = {
        //            serviceNo: '234567',
        //            paymentDate: '2015-04-30'
        //        }
        //
        //        DBService.updateDueDate(mockPayment).then(function (suc) {
        //            console.log('successed = ', suc);
        //        }, function (err) {
        //            console.log('errored = ', err);
        //        })


        var http = require('http'),
            server = http.createServer(function (req, res) {
                var body = '';
                res.setHeader('Content-Type', 'application/json');

                req.on('data', function (chunk) {
                    body += chunk;
                });

                req.on('end', function () {
                    console.log('End was called', req);
                    if (req.method === 'POST' && req.url === '/billPayment') {
                        try {
                            var paymentInfo = JSON.parse(body);
                            console.log('Received object = ', paymentInfo);
                            if (VldService.isValidPayment(paymentInfo)) {
                                console.log('Valid payment');

                                DBService.savePayment(paymentInfo).then(function () {
                                    return DBService.updateDueDate(paymentInfo);
                                }).then(function () {
                                    res.statusCode = 200;
                                    return res.end('Saved and due date updated!');
                                }, function (err) {
                                    res.statusCode = 400;
                                    console.log('Save payment failed or update due date failed', err);
                                    return res.end(formatError(err));
                                });

                            } else {
                                res.statusCode = 400;
                                return res.end('Invalid PaymentInfo object');
                            }
                        } catch (err) {
                            res.statusCode = 400;
                            return res.end(formatError(err));
                        }
                    }
                });
            });
        //TODO Use alternate port address in case of conflict
        //Also modify Chrome extension to check alternate port
        server.listen(5555);
    }]);