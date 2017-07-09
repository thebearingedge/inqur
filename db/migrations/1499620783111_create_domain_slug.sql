create domain slug as citext
  check (value ~ '^((?!_)\w)+(-|(?!_)\w)+((?!_)\w)$');
---

drop domain slug;
