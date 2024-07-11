# Initial start

`docker compose up`

# Fresh restart

`docker-compose down -v && docker-compose rm -f && docker image prune -f && docker network prune -f && docker-compose up --build`
