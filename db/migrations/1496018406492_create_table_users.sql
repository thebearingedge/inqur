create table users (
  user_id  uuid not null default uuid_generate_v4(),
  username text not null,
  email    email not null,
  password text not null,
  primary key (user_id),
  unique (username),
  unique (email)
);
---

drop table users;
