.PHONY: start, debug

start:
	docker-compose up dashboard-mpa projects-served operator documentation-site

debug:
	DEBUG=express:* docker-compose up --log-level INFO dashboard-mpa projects-served operator documentation-site --build
