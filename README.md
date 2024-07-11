# Initial start

`docker compose up`

# Fresh restart

`docker-compose down -v && docker-compose rm -f && docker image prune -f && docker network prune -f && docker-compose up --build`

# Access API documentation

http://localhost:3001/api

# DB Migrations Cheatsheet

## Direct connection to db

`docker-compose exec mysql mysql -u carsdealer -p`

## Example of creating an empty db migration

`npm run  migration:create --name=<MIGRATION_NAME>`

## Example of generating a migration from existing changes in the database

`npm run migration:generate --name=<MIGRATION_NAME>`

## Running migrations

`npm run migration:run`
