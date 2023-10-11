# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version `3.2.2`

* System dependencies

* Configuration

* Database creation
This project uses Postgres. To start it on localhost:5432 use [Postgresapp]('https://postgresapp.com/')

There are some commands applied to postgres:

`psql` or `psql -h 127.0.0.1 -U [username] [dbname]` — run postgreSQL

`\l` or `\l+` — list of databases

`\c dbname` — choose your database

`\du` - list of users

`\q` — quit from psql

`\dt` or `\dt+` - list of tables

`CREATE ROLE [username] LOGIN;` or `CREATE USER [username];` — create new db user

`DROP ROLE [username];` — remove db user

`ALTER USER [username] WITH PASSWORD ['password'];` — edit user password

`ALTER USER [username] WITH SUPERUSER;` — give a user superuser status

`ALTER USER [username] WITH NOSUPERUSER;` — take away superuser from a user

`ALTER USER [username] WITH LOGIN;` — allow a user to login

`ALTER USER [username] CREATEDB;` — allow a user to create a db

`CREATE DATABASE [dbname];` — create DB with 'mysite_development' db name

`ALTER DATABASE [dbname] OWNER TO [username];` — change db owner

`GRANT ALL PRIVILEGES ON DATABASE [dbname] TO [username];` — grant all privileges

`GRANT ALL ON [dbname] TO [username];` — grant all

`CREATE TABLE users (id INT, first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(50), password text, role text);` — create user table within dbname

`CREATE TABLE items (id INT, name VARCHAR(50), description VARCHAR(200), price DECIMAL(10,2));` — -||- items

`INSERT INTO items (id, name, description, price) VALUES (1, 'some item', 'some good item', 10.99);` - add data to items

`CREATE TABLE orders (user_id INT, amount INT);` — -||- orders

`CREATE TABLE orders_description (order_id INT, item_id INT, quantity INT);` - -||- orders_description

`\d [tablename]` — describe a table;

`SELECT * FROM [tablename];` — select table (and show it)

* Database initialization

Set up your DB for default/test/development/prooduction in `config/database.yml`.
The file is configured to run DB both locally and on [Render]('https://render.com/docs/deploy-rails').

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

Clone the repo `git clone https://github.com/001elijah/rails-e-commerce-store.git`

Install gems: `bundle install` or `bundle`

Setup database: 

`nano config/database.yml` — configure database.yml

`echo 'export MYSITE_DATABASE_PASSWORD="your_password"' ..~/.bashrc` — create variable with user db password

`source ~/.bashrc`

`rails db:create` — create db

`bin/rails server` or `rails server` or `rails s` — to start the rails server

* ...
