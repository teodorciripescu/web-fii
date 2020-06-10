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

insert into posts values('ada','All about accidents just to make sure you will not do that.Everyday stay safe - drive carefully!',random()*1000);
insert into posts values('ada','Stay safe',random()*1000);
insert into posts values('ada','',random()*1000);
insert into posts values('teo','Speed is a killer!',random()*1000);
insert into posts values('teo','Clean is better - for the road and for you also!',random()*1000);
insert into posts values('teo','It is all about the Roundabout',random()*1000);