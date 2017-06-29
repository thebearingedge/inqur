create table users (
  user_id  uuid     not null default uuid_generate_v4(),
  username username not null,
  email    email    not null,
  password text     not null,
  primary key (user_id),
  unique (username)
);

select add_timestamps('users');
---

drop table users;
