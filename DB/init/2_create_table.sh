#!/bin/bash
psql -U postgres -d bookshelf << "EOSQL"
CREATE TABLE authors (
        id SERIAL NOT NULL, 
        name VARCHAR(200), 
        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
        updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
        PRIMARY KEY (id)
);
CREATE TABLE books (
        id SERIAL NOT NULL, 
        title VARCHAR(200), 
        author_id INTEGER, 
        isbn VARCHAR(13), 
        cover_path VARCHAR(200), 
        created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
        updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
        PRIMARY KEY (id), 
        FOREIGN KEY(author_id) REFERENCES authors (id)
);
EOSQL