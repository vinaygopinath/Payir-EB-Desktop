'use strict';

/**
 * @ngdoc service
 * @name Payir-EB-Desktop-App.DBService
 * @description
 * # DBService
 * Service in the Payir-EB-Desktop-App.
 */
angular.module('Payir-EB-Desktop-App')
    .service('DBService', function DbService(DBStrings, $q) {
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
                user: 'root',
                password: 'r00t',
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

        return {
            "openConnection": openConnection,
            "saveCustomer": saveCustomer,
            "savePayment": savePayment
        }
    });