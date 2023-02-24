create table Registrations (
  username varchar(30) primary key,
  first_name varchar(30),
  last_name varchar(30),
  grade integer,
  email varchar(50),
  size varchar(1),
);

insert into Registrations values (1, 'Fred', 'Jones', 4, 'test', 'M', 'testtest');
