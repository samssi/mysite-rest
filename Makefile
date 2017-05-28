run:
	npm start

run-prod:
	NODE_ENV=production npm start

build-docker-image:
	docker build -t mysite/mysite-auth .

run-docker-image:
	docker run -d -p 8090:8090 -v ~/mysite-config:/mysite/app/config mysite/mysite-rest

run-docker-image-prod:
	docker run -d -p 8090:8090 -e NODE_ENV='production' -v ~/mysite-config:/mysite/app/config mysite/mysite-rest

run-new-docker-image: build-docker-image run-docker-image

mysite-config: clean-mysite-config
	mkdir ~/mysite-config
	cp ./json/config-examples/* ~/mysite-config

clean-mysite-config:
	rm -rf ~/mysite-config