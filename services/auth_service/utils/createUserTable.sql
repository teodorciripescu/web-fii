create table users
(
	id int auto_increment,
	username varchar(50) not null,
	password varchar(50) not null,
	email varchar(100) not null,
	constraint users_pk
		primary key (id)
);

create unique index users_email_uindex
	on users (email);

create unique index users_password_uindex
	on users (password);

create unique index users_username_uindex
	on users (username);


	--postgreSQL:
	create table users
    (
    	id serial,
    	username varchar(50) not null,
    	password varchar(50) not null,
    	email varchar(100) not null,
    	constraint users_pk
    		primary key (id)
    );

    create unique index users_email_uindex
    	on users (email);

    create unique index users_password_uindex
    	on users (password);

    create unique index users_username_uindex
    	on users (username);