## Local database

```bash
# brew install postgresql
# brew services start postgresql
initdb -D ./db
pg_ctl -D ./db -l logfile start
createuser -s postgres
createdb localdb
psql -U postgres -d localdb
# in psql
alter user postgres with encrypted password 'password';
grant all privileges on database localdb to postgres;
\q
```
