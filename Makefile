run:
	npm start

build-docker-image:
	docker build -t mysite/mysite-auth .

run-docker-image:
	docker run -d -p 8090:8090 -v ~/mysite-config:/mysite/app/config mysite/mysite-rest

run-new-docker-image: build-docker-image run-docker-image

mysite-config: clean-mysite-config
	mkdir ~/mysite-config
	cp ./json/config-examples/default.json ~/mysite-config

clean-mysite-config:
	rm -rf ~/mysite-config