create table admins(
    username char(100),
password char(100)

);
create table posts(
    username char(100),
    message char(1000),
    dateul float

);
alter table admins add constraint cheie primary key (username);
alter table posts add constraint cheie1 primary key (username,dateul);