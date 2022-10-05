
# Common commands
down:
	docker-compose down
stop:
	docker-compose stop

# Development commands
start-dev:
	docker-compose -f docker-compose.yaml up -d
build-dev:
	docker-compose -f docker-compose.yaml up -d --no-deps --build

# Production commands
start-prod:
	docker compose -f docker-compose-prod.yaml up
build-prod:
	docker-compose -f docker-compose-prod.yaml up -d --no-deps --build
