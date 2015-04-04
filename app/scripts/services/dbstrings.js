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

        "CREATE_CUST_TBL": "CREATE TABLE customer (serviceNo INTEGER PRIMARY KEY, name VARCHAR(20) NOT NULL, dateOfBirth DATE, dateOfJoining DATE, dueDate DATE NOT NULL, mobileNo VARCHAR(13), address VARCHAR(50), village VARCHAR(20) NOT NULL, username VARCHAR(20), password VARCHAR(20), email VARCHAR(25), INDEX(dueDate), INDEX(name, village)) ENGINE = InnoDB;",

        "CREATE_BILL_PAY_TBL": "CREATE TABLE billPayment (serviceNo INTEGER PRIMARY KEY, paymentDate DATE NOT NULL, amount INTEGER NOT NULL, INDEX (paymentDate), FOREIGN KEY custServiceNo (serviceNo) REFERENCES customer (serviceNo) ON DELETE CASCADE) ENGINE=InnoDB;",

        "INSERT_CUST": "INSERT INTO customer SET ?",

        "INSERT_BILL": "INSERT INTO billPayment SET ?"

    });