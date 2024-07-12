# Initial start

In case `MYSQL_HOST=host.docker.internal`: `docker compose up`

In case `MYSQL_HOST=localhost`: `npm run start:dev` (With this option you need to have your localhost mysql server instance running at port 3306, prepared with database `cars` and user `carsdealer` and password `relaed` that has privileges on that database)

# Fresh restart

`docker-compose down -v && docker-compose rm -f && docker image prune -f && docker network prune -f && docker-compose up --build`

# Access API documentation

Docker is running on port 3001 and localhost on 3000 by default:

localhost: http://localhost:3000/api
or
docker: http://localhost:3001/api

# DB Migrations Cheatsheet

## Direct connection to db

`docker-compose exec mysql mysql -u carsdealer -p`

## Example of creating an empty db migration

`npm run  migration:create --name=<MIGRATION_NAME>`

## Example of generating a migration from existing changes in the database

`npm run migration:generate --name=<MIGRATION_NAME>`

## Running migrations

`npm run migration:run`
