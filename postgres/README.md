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

## Useful commands

* View user-defined enums (Useful when creating Drizzle enums)
```SQL
SELECT t.typname AS enum_type, e.enumlabel AS enum_value
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public'
ORDER BY t.typname, e.enumsortorder;
```
