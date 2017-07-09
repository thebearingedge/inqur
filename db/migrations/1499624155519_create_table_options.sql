create table options (
  option_id uuid   not null default uuid_generate_v4(),
  answer    citext not null,
  poll_id   uuid   not null,
  primary key (option_id),
  unique (answer, poll_id),
  foreign key (poll_id)
    references polls (poll_id)
);

select add_timestamps('options');
---

drop table options;
