build: docker-compose.yml
	docker-compose  build
up: docker-compose.yml
	docker-compose build --up

down: docker-compose.yml
	docker-compose down

test: docker-compose.yml
	docker-compose run web db python3 manage.py test

server: docker-compose.yml
	docker-compose run web python3 manage.py runserver

backend: docker-compose.yml
	docker-compose run web

frontend: docker-compose.yml
	docker-compose run front

ssh: docker-compose.yml
	docker exec -it web	 sh

flake8:
	flake8 $(MAKECMDGOALS)