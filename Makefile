# Common commands
down:
	docker-compose down

# Development commands
start-dev:
	docker-compose -f docker-compose.yaml up -d
build-dev:
	docker-compose -f docker-compose.yaml up -d --no-deps --build

# Production commands
start-prod:
	docker compose -f apprunner.yaml up
build-prod:
	cd ui && npm run build:prod && cd ../ && docker-compose -f apprunner.yaml up -d --no-deps --build
