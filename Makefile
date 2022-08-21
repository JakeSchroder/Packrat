build:
	docker-compose up -d --no-deps --build

down:
	docker-compose down

stop:
	docker-compose stop

start:
	docker-compose up -d
