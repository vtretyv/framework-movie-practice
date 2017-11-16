DROP DATABASE IF EXISTS movielist;
CREATE DATABASE IF NOT EXISTS movielist;
USE movielist;

CREATE TABLE IF NOT EXISTS movies (
    id int not null primary key auto_increment,
    name varchar(100) not null,
    release_date date
);