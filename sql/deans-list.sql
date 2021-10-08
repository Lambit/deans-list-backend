\echo 'Delete and recreate deans_list db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE deans_list_coral;
CREATE DATABASE deans_list_coral;
\connect deans_list_coral

\i deans-list-schema.sql
\i deans-list-seed.sql

\echo 'Delete and recreate deans_list_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE deans_list_coral_test;
CREATE DATABASE deans_list_coral_test;
\connect deans_list_coral_test

\i deans-list-schema.sql