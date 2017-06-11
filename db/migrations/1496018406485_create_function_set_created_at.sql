create function set_created_at() returns trigger as $$
  begin
    new.created_at = now();
    return new;
  end;
$$ language plpgsql;
---

drop function set_created_at();
