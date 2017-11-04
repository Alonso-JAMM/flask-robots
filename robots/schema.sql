create table users (
  id integer primary key autoincrement,
  username varchar(20),
  password varchar(20)
);

create table projects (
  id integer primary key autoincrement,
  name varchar(50),
  url  varchar(50),
  page varchar(50),
  picture varcha(50)
);

insert into projects (name, url, page, picture) values ("controller", "bot.controller", "controller.html", "bot1.jpg");
insert into projects (name, url, page, picture) values ("streamer", "bot.streamer","streamer.html", "streamer.png");

insert into users (username, password) values ("default", "123");
