# Initial start

## With Docker:

`MYSQL_HOST=host.docker.internal`
`docker compose up`

## On local machine:

Note: With this option you need to have your localhost mysql server instance running at port 3306, prepared with database `cars` and user `carsdealer` and password `relaed` that has privileges on that database.

`MYSQL_HOST=localhost`
`npm run migration:run && npm run start:dev`

# Fresh restart

`docker-compose down -v && docker-compose rm -f && docker image prune -f && docker network prune -f && docker-compose up --build`

# Access API documentation

Docker is running on port 3001 and localhost on 3000 by default:

localhost: http://localhost:3000/api
or
docker: http://localhost:3001/api

# Access API endpoints

Get all cars:
GET: `localhost:3000/api/cars`

Create a new car:
POST:
Get an auth token by registering a new user with username `testuser` and password `testpassword`:
`curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}'`

Alternatively for existing user use the login endpoint:
`curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}'`

Use the response output to take the auth token and pass it in the header by replacing <YOUR_TOKEN_HERE> in the curl command:
`curl -X POST http://localhost:3000/cars -H "Authorization: Bearer <YOUR_TOKEN_HERE>" -H "Content-Type: application/json" -d '{"make":"Toyota","model":"Camry","year":2020,"engine":"2.5L","type":"Sedan","gearbox":"Automatic","car_condition":"Used","hp":200,"color":"Red","price":"25000.00","city":"New York","mileage":"50,000","extras":"Leather seats, Sunroof"}'`

Edit existing car:
`curl -X PATCH http://localhost:3000/cars/<CAR_ID_CREATED_BY_THE_USER_WHOS_TOKEN_IS_IN_THE_HEADER> -H "Authorization: Bearer <YOUR_TOKEN_HERE>" -H "Content-Type: application/json" -d '{"year":2024}'`

# DB Migrations Cheatsheet

## Direct connection to db

`docker-compose exec mysql mysql -u carsdealer -p`

## Example of creating an empty db migration

`npm run  migration:create --name=<MIGRATION_NAME>`

## Example of generating a migration from existing changes in the database

`npm run migration:generate --name=<MIGRATION_NAME>`

## Running migrations

`npm run migration:run`
