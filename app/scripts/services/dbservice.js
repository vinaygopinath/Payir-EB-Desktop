/**
 * @ngdoc service
 * @name Payir-EB-Desktop-App.DBService
 * @description
 * # DBService
 * Service in the Payir-EB-Desktop-App.
 */
angular.module('Payir-EB-Desktop-App')
    .service('DBService', function DbService(DBStrings, $q, $filter) {
        'use strict';
        var cachedConn;

        function openConnection() {
            // If cached already, return a promise and resolve it with the cached connection
            var deferred = $q.defer();
            if (cachedConn) {
                deferred.resolve(cachedConn);
                return deferred.promise;
            }

            //Create a new connection
            var mysql = require('mysql'),
                connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'payir_eb',
                    password: 'payir_eb',
                    multipleStatements: true
                });

            //Connect to MySQL
            connection.connect(function (err) {
                if (err) {
                    deferred.reject('Error connecting to MySQL: ' + err.stack);
                } else {
                    //Attempt to use the relevant DB
                    connection.query(DBStrings.USE_DB, function (err) {
                        if (err) {
                            //Create the DB in case it does not exist
                            //var query = 
                            connection.query(DBStrings.CREATE_DB, function (err2) {
                                //console.log('Create DB query is ', query.sql);
                                if (err2) {
                                    deferred.reject('Error creating DB: ' + err);
                                } else {
                                    //var q2 = 
                                    connection.query(DBStrings.USE_DB + DBStrings.CREATE_CUST_TBL + DBStrings.CREATE_BILL_PAY_TBL, function (err3) {
                                        //console.log('Create tables query is ', q2.sql);
                                        if (err3) {
                                            deferred.reject('Error creating tables: ' + err);
                                        } else {
                                            cachedConn = connection;
                                            deferred.resolve(cachedConn);
                                        }
                                    });
                                }
                            });
                        } else {
                            cachedConn = connection;
                            deferred.resolve(cachedConn);
                        }
                    });
                }
            });

            return deferred.promise;
        }

        function saveCustomer(customer) {
            var deferred = $q.defer();

            openConnection().then(function (connection) {
                connection.query(DBStrings.INSERT_CUST, customer, function (err) {
                    if (err) {
                        deferred.reject('Error while inserting: ' + err.stack);
                    } else {
                        deferred.resolve();
                    }
                });

            }, function (errMsg) {
                deferred.reject(errMsg);
            });

            return deferred.promise;
        }

        function savePayment(payment) {
            var deferred = $q.defer();

            openConnection().then(function (connection) {
                connection.query(DBStrings.INSERT_BILL, payment, function (err) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve();
                    }
                });
            }, function (errMsg) {
                deferred.reject(errMsg);
            });

            return deferred.promise;
        }

        function searchCustomers(search) {
            var deferred = $q.defer();

            openConnection().then(function (connection) {
                var query = DBStrings.SEARCH_CUSTOMERS_BASE;
                var queryParams = [];
                var filterCount = 0;
                if (search.serviceNo) {
                    query = query + 'serviceNo LIKE ' + connection.escape('%' + search.serviceNo.trim() + '%');
                    filterCount += 1;
                }

                if (search.name) {
                    query = (filterCount > 0) ? (query + ' AND ') : query;
                    query += 'name LIKE ' + connection.escape('%' + search.name.trim() + '%');
                    filterCount += 1;
                }

                if (search.village) {
                    query = (filterCount > 0) ? (query + ' AND ') : query;
                    query += 'village LIKE ' + connection.escape('%' + search.village.trim() + '%');
                    filterCount += 1;
                }

                query += ' ORDER BY name,village';

                //                console.log('Query is ', query);
                //                console.log('QueryParams are ', queryParams);
                //var qry = 
                connection.query(query, queryParams, function (err, results) {
                    //                    console.log('Executed query was ', qry.sql);
                    if (err) {
                        deferred.reject('Error while querying ' + err);
                    } else {
                        deferred.resolve(results);
                    }
                });
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getCustomer(serviceNo) {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                //var query = 
                connection.query(DBStrings.GET_CUSTOMER, serviceNo, function (err, result) {
                    //                    console.log('Executed query was ', query.sql);
                    if (err) {
                        deferred.reject('Error while fetching customer ' + err);
                    } else {
                        var cust;
                        if (result && result.length === 1) {
                            console.log('getCustomer = ', result);
                            cust = angular.copy(result[0]); //Copy result to cust. This will be modified

                            cust.username = cust.username || 'N/A';
                            cust.email = cust.email || 'N/A';
                            cust.dateOfBirth = cust.dateOfBirth ? $filter('date')(cust.dateOfBirth, 'yyyy-MM-dd') : 'N/A';
                            cust.address = cust.address || 'N/A';
                            cust.mobileNo = cust.mobileNo || 'N/A';
                            cust.password = cust.password || 'N/A';
                            cust.dateOfJoining = cust.dateOfJoining ? $filter('date')(cust.dateOfJoining, 'yyyy-MM-dd') : 'N/A';
                            cust.dueDate = cust.dueDate ? $filter('date')(cust.dueDate, 'yyyy-MM-dd') : 'N/A';
                            cust.village = cust.village || 'N/A';

                            cust.raw = result[0]; //Also copy result to raw. This will be preserved as is.
                        }
                        deferred.resolve(cust);
                    }
                });
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getPaymentHistory(serviceNo) {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                //var query = 
                connection.query(DBStrings.GET_PAYMENT_HIST, serviceNo, function (err, results) {
                    //                    console.log('Get Payment History Query = ' + query.sql);
                    if (err) {
                        deferred.reject('Error while fetching payment history: ' + err);
                    } else {
                        deferred.resolve(results);
                    }
                });
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getDistinctVillages() {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                //var query = 
                connection.query(DBStrings.GET_DISTINCT_VILLAGES, function (err, results) {
                    //                    console.log('Get distinct villages query = ', query.sql);
                    if (err) {
                        deferred.reject('Error fetching distint villages ' + err);
                    } else {
                        var villages = [];
                        results.forEach(function (row) {
                            villages.push(row.village);
                        });
                        deferred.resolve(villages);
                    }
                });
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getServiceNos() {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                connection.query(DBStrings.GET_SERVICE_NOS, function (err, results) {
                    if (err) {
                        deferred.reject('Error fetching serviceNos ' + err);
                    } else {
                        var serviceNos = [];
                        results.forEach(function (row) {
                            serviceNos.push(row.serviceNo);
                        });
                        deferred.resolve(serviceNos);
                    }
                });
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function deleteCustomer(serviceNo) {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                connection.query(DBStrings.DELETE_CUSTOMER, serviceNo, function (err, results) {
                    if (err || results.affectedRows !== 1) {
                        deferred.reject('Error deleting customer ' + err);
                    }
                    deferred.resolve(results);
                });
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function updateCustomer(customer) {
            var deferred = $q.defer();

            openConnection().then(function (connection) {
                    var sNo = customer.serviceNo;

                    //Using the original customer object would result in a node-mysql duplicate entry error
                    var dbCustomer = {};
                    //The if conditions are necessary to avoid NULL value updates in case of updateDueDate
                    if (customer.address) {
                        dbCustomer.address = customer.address;
                    }
                    if (customer.dateOfBirth) {
                        dbCustomer.dateOfBirth = customer.dateOfBirth;
                    }
                    if (customer.dateOfJoining) {
                        dbCustomer.dateOfJoining = customer.dateOfJoining;
                    }
                    dbCustomer.dueDate = customer.dueDate;
                    if (customer.email) {
                        dbCustomer.email = customer.email;
                    }
                    if (customer.mobileNo) {
                        dbCustomer.mobileNo = customer.mobileNo;
                    }
                    if (customer.name) {
                        dbCustomer.name = customer.name;
                    }
                    if (customer.password) {
                        dbCustomer.password = customer.password;
                    }
                    if (customer.username) {
                        dbCustomer.username = customer.username;
                    }
                    if (customer.village) {
                        dbCustomer.village = customer.village;
                    }
                    //var query = 
                    connection.query(DBStrings.UPDATE_CUSTOMER_BASE + connection.escape(sNo), dbCustomer, function (err) {
                        //console.log('Update query is ', query.sql);
                        if (err) {
                            deferred.reject('Error while updating: ' + err.stack);
                        } else {
                            console.log('Update customer success');
                            deferred.resolve();
                        }
                    });

                },
                function (errMsg) {
                    deferred.reject(errMsg);
                });

            return deferred.promise;
        }

        function getTimeReport(dateRange) {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                    var queryParams = [];
                    for (var i = 0; i < 4; i++) {
                        queryParams.push(dateRange.startDate);
                        queryParams.push(dateRange.endDate);
                    }
                    var timeReportQuery = DBStrings.GET_TIME_REPORT_CUST_STAT + DBStrings.GET_TIME_REPORT_BILL_STAT + DBStrings.GET_TIME_REPORT_AMT_STAT + DBStrings.GET_TIME_REPORT;
                    //var query = 
                    connection.query(timeReportQuery, queryParams, function (err, results) {
                        if (err) {
                            deferred.reject('Error while fetching time report ' + err);
                        }
                        //                        console.log('Time report query = ', query.sql);
                        var resObj = {};
                        if (results[0]) {
                            resObj.custCount = results[0][0].custCount;
                        }
                        if (results[1]) {
                            resObj.paymentCount = results[1][0].paymentCount;
                        }
                        if (results[2]) {
                            resObj.totalAmount = results[2][0].totalAmount;
                        }
                        if (results[3]) {
                            resObj.tableRows = results[3];
                        }
                        console.log('resObj = ', resObj);
                        deferred.resolve(resObj);
                    });
                },
                function (errMsg) {
                    deferred.reject(errMsg);
                });
            return deferred.promise;
        }

        function getNotPaidReport() {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                    connection.query(DBStrings.GET_NOT_PAID_REPORT, function (err, results) {
                        if (err) {
                            deferred.reject('Error while getting not paid report ' + err);
                        } else {
                            deferred.resolve(results);
                        }
                    });
                },
                function (errMsg) {
                    deferred.reject(errMsg);
                });
            return deferred.promise;
        }

        function getPaymentDueReport() {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                var date = new Date();
                //The first day of the current month
                var firstDay = $filter('date')(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
                //The zero-th day of the next month = the last day of the current month
                var lastDay = $filter('date')(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');

                connection.query(DBStrings.GET_PAYMENT_DUE_REPORT, [firstDay, lastDay], function (err, results) {
                    if (err) {
                        deferred.reject('Error fetching payment due report = ' + err);
                    } else {
                        deferred.resolve(results);
                    }
                });
            }, function (errMsg) {
                deferred.reject(errMsg);
            });
            return deferred.promise;
        }

        function updateDueDate(payment) {
            var deferred = $q.defer();
            getCustomer(payment.serviceNo).then(function (customer) {
                    console.log('Received due date = ', customer.dueDate);

                    var dueDate = new Date(customer.dueDate);
                    var paymentDate = new Date(payment.paymentDate);
                    console.log('presentDueDate = ', dueDate);
                    console.log('paymentDate = ', paymentDate);
                    console.log('difference = ', dueDate - paymentDate);
                    var nextDueDate;

                    nextDueDate = new Date(dueDate);
                    nextDueDate.setMonth(nextDueDate.getMonth() + 2);

                    updateCustomer({
                        serviceNo: payment.serviceNo,
                        dueDate: $filter('date')(nextDueDate, 'yyyy-MM-dd')
                    }).then(function (succ) {
                        deferred.resolve(succ);
                    }, function (err) {
                        deferred.reject(err);
                    });


                    //TODO [Low] Consider checking for late and skipped payments (jumping over a billing cycle)
                    //var MS_PER_DAY = 1000 * 60 * 60 * 24;
                    //                    if (dueDate - paymentDate >= 0) {
                    //                        //Normal payment. Advance dueDate by two months
                    //                        console.log('**Normal payment**');
                    //                        nextDueDate = new Date(dueDate);
                    //                        nextDueDate.setMonth(nextDueDate.getMonth() + 2);
                    //                    } else {
                    //                        //Late payment. Calc if one payment cycle has been skipped
                    //                        console.log('**Late payment**');
                    //                        nextDueDate = new Date(dueDate);
                    //                        do {
                    //                            nextDueDate.setMonth(nextDueDate.getMonth() + 2);
                    //                        } while (nextDueDate - paymentDate < 0);
                    //                        console.log('Next Due Date (NDD) = ', nextDueDate);
                    //                        var daysToNDD = (nextDueDate - paymentDate) / MS_PER_DAY;
                    //                        var daysSinceDD = ()
                    //                    }
                },
                function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        return {
            'openConnection': openConnection,
            'saveCustomer': saveCustomer,
            'savePayment': savePayment,
            'searchCustomers': searchCustomers,
            'getCustomer': getCustomer,
            'getPaymentHistory': getPaymentHistory,
            'getDistinctVillages': getDistinctVillages,
            'getServiceNos': getServiceNos,
            'deleteCustomer': deleteCustomer,
            'updateCustomer': updateCustomer,
            'getTimeReport': getTimeReport,
            'getNotPaidReport': getNotPaidReport,
            'getPaymentDueReport': getPaymentDueReport,
            'updateDueDate': updateDueDate
        };
    });