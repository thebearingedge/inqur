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

create function polls_check_poll_options() returns trigger as $$
  declare
    options_count integer;
  begin
    select into options_count count(o.option_id)
      from options as o
     where o.poll_id = new.poll_id;
    if options_count < 2 then
      raise exception 'cannot save fewer than two options for poll_id %', new.poll_id;
    end if;
    return null;
  end;
$$ language 'plpgsql';

create constraint trigger check_poll_options
after insert on polls
deferrable initially deferred
for each row
execute procedure polls_check_poll_options();
---

drop trigger check_poll_options on polls;
drop function polls_check_poll_options();
drop table options;
