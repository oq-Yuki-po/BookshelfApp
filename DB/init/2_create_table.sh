#!/bin/bash
psql -U postgres -d bookshelf << "EOSQL"
create table book (id bigint PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL);
EOSQL