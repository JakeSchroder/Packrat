MERN stack

COMMANDS:
    Build with no cache -
        docker-compose build --no-cache
    Start the services -
        docker-compose up
    List the services -
        docker-compose ps
    List the containers -
        docker ps
    Stop services -
        docker-compose stop
    Backup DB -
        mongodump --host=localhost --port=27017 --out=~/Development/EverythingEverywhere/backup/mongodump-2022-09-28