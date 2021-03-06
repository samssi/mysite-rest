run:
	npm start

run-prod:
	NODE_ENV=production npm start

build-docker-image:
	docker build -t mysite/mysite-rest .

run-docker-image:
	docker run -d -p 8090:8090 mysite/mysite-rest

run-docker-image-prod:
	docker run -d -p 8090:8090 -e NODE_ENV='production' -v ~/.mysite-rest-config:/mysite/app/config mysite/mysite-rest

run-new-docker-image: build-docker-image run-docker-image

clean-config: delete-config
	mkdir ~/.mysite-rest-config
	cp ./json/config-examples/* ~/.mysite-rest-config

delete-config:
	rm -rf ~/.mysite-rest-config
