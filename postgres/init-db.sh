#!/bin/bash

initdb -D $PWD/db
pg_ctl -D $PWD/db -l $PWD/logfile start
createuser -s postgres
createdb localdb
psql -U postgres -d localdb <<EOF
alter user postgres with encrypted password 'password';
grant all privileges on database localdb to postgres;
EOF
