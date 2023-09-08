CREATE TABLE login (ID int(11) AUTO_INCREMENT NOT null, name varchar (200) NOT null,email varchar (200) NOT null,password varchar (200) NOT null, PRIMARY KEY(id));

CREATE TABLE signup (ID int(11) AUTO_INCREMENT NOT null, name varchar (200) NOT null,email varchar (200) NOT null,password varchar (200) NOT null,address varchar (200) NOT null,contect varchar (200) NOT null, PRIMARY KEY(id));

CREATE TABLE subscription(ID int (11) AUTO_INCREMENT not null,customer_id varchar(200) NOT null,
signup_id int(11) NOT null,invoice_id varchar(300) NOT null, subscription_id varchar(200) NOT null, subscription_created varchar(200) NOT null, subscription_expire varchar(200) NOT null,PRIMARY KEY(id), FOREIGN KEY(signup_id)REFERENCES signup(id));









