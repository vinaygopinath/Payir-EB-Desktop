'use strict';

/**
 * @ngdoc service
 * @name Payir-EB-Desktop-App.DBService
 * @description
 * # DBService
 * Service in the Payir-EB-Desktop-App.
 */
angular.module('Payir-EB-Desktop-App')
    .service('DBService', function DbService(DBStrings, $q, $filter) {
        var _connection;

        function openConnection() {
            // If cached already, return a promise and resolve it with the cached connection
            var deferred = $q.defer();
            if (_connection) {
                deferred.resolve(_connection);
                return deferred.promise;
            }

            //Create a new connection
            var mysql = require('mysql');
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'payir_eb',
                password: 'payir_eb',
                multipleStatements: true
            });

            //Connect to MySQL
            connection.connect(function (err) {
                if (err) {
                    deferred.reject("Error connecting to MySQL: " + err.stack);
                } else {
                    //Attempt to use the relevant DB
                    connection.query(DBStrings.USE_DB, function (err) {
                        if (err) {
                            //Create the DB in case it does not exist
                            var query = connection.query(DBStrings.CREATE_DB, function (err2) {
                                console.log("Create DB query is ", query.sql);
                                if (err2) {
                                    deferred.reject("Error creating DB: " + err);
                                } else {
                                    var q2 = connection.query(DBStrings.USE_DB + DBStrings.CREATE_CUST_TBL + DBStrings.CREATE_BILL_PAY_TBL, function (err3) {
                                        console.log("Create tables query is ", q2.sql);
                                        if (err3) {
                                            deferred.reject("Error creating tables: " + err);
                                        } else {
                                            _connection = connection;
                                            deferred.resolve(_connection);
                                        }
                                    })
                                }
                            });
                            console.log("create query = ", query.sql);
                        } else {
                            _connection = connection;
                            deferred.resolve(_connection);
                        }
                    });
                }
            });

            return deferred.promise;
        }

        function saveCustomer(customer) {
            var deferred = $q.defer();

            openConnection().then(function (connection) {
                console.log("Opened connection. Trying to save", customer);
                connection.query(DBStrings.INSERT_CUST, customer, function (err, result) {
                    if (err) {
                        deferred.reject("Error while inserting: " + err.stack);
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
                connection.query(DBStrings.INSERT_BILL, payment, function (err, result) {
                    if (err) {
                        deferred.reject("Error while inserting " + err);
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
            var query, queryParams;
            if (search.serviceNo) {
                query = DBStrings.SEARCH_CUSTOMERS_SNO;
                queryParams = ["%" + search.serviceNo.trim() + "%"];
            } else if (search.name && search.village) {
                query = DBStrings.SEARCH_CUSTOMERS_NM_VILL;
                queryParams = ["%" + search.name.trim() + "%", "%" + search.village.trim() + "%"];
            }

            openConnection().then(function (connection) {
                var qry = connection.query(query, queryParams, function (err, results) {
                    console.log("Executed query was ", qry.sql);
                    if (err) {
                        deferred.reject("Error while querying " + err);
                    } else {
                        deferred.resolve(results);
                    }
                })
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getCustomer(serviceNo) {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                var query = connection.query(DBStrings.GET_CUSTOMER, serviceNo, function (err, result) {
                    console.log("Executed query was ", query.sql);
                    if (err) {
                        deferred.reject("Error while fetching customer " + err);
                    } else {
                        var cust;
                        if (result && result.length == 1) {
                            cust = result[0]; //Copy result to cust. This will be modified

                            cust.username = cust.username ? cust.username : 'N/A';
                            cust.email = cust.email ? cust.email : 'N/A';
                            cust.dateOfBirth = cust.dateOfBirth ? $filter("date")(cust.dateOfBirth, "yyyy-MM-dd") : 'N/A';
                            cust.address = cust.address ? cust.address : 'N/A';
                            cust.mobileNo = cust.mobileNo ? cust.mobileNo : 'N/A';
                            cust.password = cust.password ? cust.password : 'N/A';
                            cust.dateOfJoining = cust.dateOfJoining ? $filter("date")(cust.dateOfJoining, "yyyy-MM-dd") : 'N/A';
                            cust.dueDate = cust.dueDate ? $filter("date")(cust.dueDate, "yyyy-MM-dd") : 'N/A';
                            cust.village = cust.village ? cust.village : 'N/A';

                            //TODO Provide original result as cust.raw
                            //Currently, the object is modified because cust also refers to result[0]
                            cust.raw = result[0]; //Also copy result to raw. This will be preserved as is.
                            console.log("GetCustomer = ", cust);
                        }
                        deferred.resolve(cust);
                    }
                })
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function getPaymentHistory(serviceNo) {
            var deferred = $q.defer();
            openConnection().then(function (connection) {
                var query = connection.query(DBStrings.GET_PAYMENT_HIST, serviceNo, function (err, results) {
                    console.log("Get Payment History Query = " + query.sql);
                    if (err) {
                        deferred.reject("Error while fetching payment history: " + err);
                    } else {
                        deferred.resolve(results);
                    }
                });
            }, function (err) {
                deferred.reject(err);
            })
            return deferred.promise;
        }

        return {
            "openConnection": openConnection,
            "saveCustomer": saveCustomer,
            "savePayment": savePayment,
            "searchCustomers": searchCustomers,
            "getCustomer": getCustomer,
            "getPaymentHistory": getPaymentHistory
        }
    });