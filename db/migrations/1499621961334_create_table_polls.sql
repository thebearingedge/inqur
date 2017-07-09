create table polls (
  poll_id      uuid not null default uuid_generate_v4(),
  question     text not null,
  slug         slug not null,
  is_published boolean not null default false,
  user_id      uuid not null,
  primary key (poll_id),
  unique (slug, user_id),
  foreign key (user_id)
    references users (user_id)
);

select add_timestamps('polls');
---

drop table polls;
