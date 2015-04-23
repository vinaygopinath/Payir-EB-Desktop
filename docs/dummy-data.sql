INSERT INTO `payir_eb`.`customer` (`serviceNo`, `name`, `dateOfBirth`, `dateOfJoining`, `dueDate`, `mobileNo`, `address`, `village`, `username`, `password`, `email`) VALUES ('11223344', 'ABC', '1990-01-01', '2015-01-01', '2015-04-20', '1234567890', 'Some Door Number, Some Road, Some Village', 'Thenur', 'abcdef', 'password', 'abcdef@gmail.com');

INSERT INTO `payir_eb`.`customer` (`serviceNo`, `name`, `dateOfBirth`, `dateOfJoining`, `dueDate`, `mobileNo`, `address`, `village`, `username`, `password`) VALUES ('11122233344', 'DEF', '1988-02-05', '2015-04-01', '2015-04-25', '9876543210', 'D1/2, Road 3/4', 'Thottiyapatti', 'defaccount', 'passw0rd');

INSERT INTO `payir_eb`.`customer` (`serviceNo`, `name`, `dateOfBirth`, `dateOfJoining`, `dueDate`, `mobileNo`, `address`, `village`, `username`, `password`) VALUES ('44332211005', 'GHI', '1989-10-02', '2014-11-01', '2015-05-05', '9876543211', 'D1/2, Road 3/4', 'Thenur', 'ghi', 'passwooord');

INSERT INTO `customer` (`serviceNo`,`name`,`dateOfBirth`,`dateOfJoining`,`dueDate`,`mobileNo`,`address`,`village`,`username`,`password`,`email`) VALUES ('12334456','Person','2015-04-17',NULL,'2015-04-01',NULL,NULL,'Thenur','ABC',NULL,NULL);
INSERT INTO `customer` (`serviceNo`,`name`,`dateOfBirth`,`dateOfJoining`,`dueDate`,`mobileNo`,`address`,`village`,`username`,`password`,`email`) VALUES ('123456','TestABC','2015-04-01','2015-04-03','2015-04-02',NULL,NULL,'Nathakadu',NULL,NULL,NULL);
INSERT INTO `customer` (`serviceNo`,`name`,`dateOfBirth`,`dateOfJoining`,`dueDate`,`mobileNo`,`address`,`village`,`username`,`password`,`email`) VALUES ('234567','Test DEF','2015-04-02','2015-04-01','2015-04-03',NULL,NULL,'Nathakadu',NULL,NULL,NULL);
INSERT INTO `customer` (`serviceNo`,`name`,`dateOfBirth`,`dateOfJoining`,`dueDate`,`mobileNo`,`address`,`village`,`username`,`password`,`email`) VALUES ('343534','Name','0000-00-00','2015-04-10','2015-04-09',NULL,NULL,'Thottiyapatti','sdlsdf',NULL,'sdlk2gdsk@fdlsk.com');
INSERT INTO `customer` (`serviceNo`,`name`,`dateOfBirth`,`dateOfJoining`,`dueDate`,`mobileNo`,`address`,`village`,`username`,`password`,`email`) VALUES ('34567','Test GHI',NULL,'2015-04-03','2015-04-10',NULL,NULL,'Nathakadu','ghijjiiii',NULL,NULL);
INSERT INTO `customer` (`serviceNo`,`name`,`dateOfBirth`,`dateOfJoining`,`dueDate`,`mobileNo`,`address`,`village`,`username`,`password`,`email`) VALUES ('44332211005','GHI','1989-10-02','2014-11-01','2015-05-05','9876543211','D1/2, Road 3/4','Thenur','ghi','passwooord',NULL);

INSERT INTO customer(serviceNo, name, dueDate, village) VALUES ('555555','vinay','2015-05-05','Thenur');

INSERT INTO billPayment VALUES ('555555','2015-04-20',120);

INSERT INTO billPayment VALUES ('555555','2015-04-10',110);