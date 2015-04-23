'use strict';

/**
 * @ngdoc service
 * @name Payir-EB-Desktop-App.DBStrings
 * @description
 * # DBStrings
 * Constant in the Payir-EB-Desktop-App.
 */
angular.module('Payir-EB-Desktop-App')
    .constant('DBStrings', {
        "CREATE_DB": "CREATE DATABASE payir_eb;",

        "USE_DB": "USE payir_eb;",

        "CREATE_CUST_TBL": "CREATE TABLE customer (serviceNo VARCHAR(11) PRIMARY KEY, name VARCHAR(20) NOT NULL, dateOfBirth DATE, dateOfJoining DATE, dueDate DATE NOT NULL, mobileNo VARCHAR(13), address VARCHAR(50), village VARCHAR(20) NOT NULL, username VARCHAR(20), password VARCHAR(20), email VARCHAR(25), INDEX(dueDate), INDEX(name, village)) ENGINE = InnoDB;",

        "CREATE_BILL_PAY_TBL": "CREATE TABLE billPayment (serviceNo VARCHAR(11) NOT NULL, paymentDate DATE NOT NULL, amount INTEGER NOT NULL, INDEX (paymentDate), FOREIGN KEY custServiceNo (serviceNo) REFERENCES customer (serviceNo) ON DELETE CASCADE, UNIQUE KEY uniqueBill (serviceNo, paymentDate, amount)) ENGINE=InnoDB;",

        "INSERT_CUST": "INSERT INTO customer SET ?",

        "INSERT_BILL": "INSERT INTO billPayment SET ?",

        "SEARCH_CUSTOMERS_BASE": "SELECT serviceNo, name, username, village, mobileNo, address  FROM customer WHERE ",

        "GET_CUSTOMER": "SELECT * FROM customer WHERE serviceNo = ?",

        "GET_PAYMENT_HIST": "SELECT paymentDate, amount FROM billPayment WHERE serviceNo = ? ORDER BY paymentDate DESC",

        "GET_DISTINCT_VILLAGES": "SELECT DISTINCT village FROM customer",

        "GET_SERVICE_NOS": "SELECT serviceNo FROM customer",

        "DELETE_CUSTOMER": "DELETE FROM customer WHERE serviceNo = ?",

        "UPDATE_CUSTOMER_BASE": "UPDATE customer SET ? WHERE serviceNo = ",

        "GET_TIME_REPORT": "SELECT paymentDate, customer.serviceNo, name, username, village, amount  FROM billPayment INNER JOIN customer ON billPayment.serviceNo = customer.serviceNo WHERE paymentDate BETWEEN ? AND ? ORDER BY paymentDate ASC;",

        "GET_TIME_REPORT_CUST_STAT": "SELECT COUNT(DISTINCT serviceNo) AS custCount FROM billPayment WHERE paymentDate BETWEEN ? AND ?;",

        "GET_TIME_REPORT_BILL_STAT": "SELECT COUNT(serviceNo) AS paymentCount FROM billPayment WHERE paymentDate BETWEEN ? AND ?;",

        "GET_TIME_REPORT_AMT_STAT": "SELECT SUM(amount) AS totalAmount FROM billPayment WHERE paymentDate BETWEEN ? AND ?;",

        "GET_PAYMENT_DUE_REPORT": "SELECT dueDate, serviceNo, name, username, village FROM customer WHERE dueDate BETWEEN ? AND ?",

        "GET_NOT_PAID_REPORT": "SELECT dueDate, serviceNo, name, username, village FROM customer WHERE dueDate < NOW()"
    });