create domain username as citext
  check (value ~ '^[a-zA-Z0-9]{4,63}$');
---

drop domain username;
