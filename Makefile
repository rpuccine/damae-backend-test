# Build des images Docker
build:
	docker-compose build

# Lancer les conteneurs
up:
	docker-compose up

# Arrêter les conteneurs
down:
	docker-compose down

# Nettoyage et rebuild
rebuild:
	docker-compose down
	docker-compose build
	docker-compose up