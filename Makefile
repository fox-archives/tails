.PHONY: start, lint

start:
	docker-compose up nats dashboard-mpa editor operator deubg

lint:
	cd protobufs && prototool lint .
