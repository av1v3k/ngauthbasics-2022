Angular Authentication Project - July 7th, 2022


Goal:
====
1. To create a specific version of angular, in a specific version of NodeJS in a container and not locally.
2. To create Docker with appropriate Node & Angular version.
    - Node Version was 16.15.1 LTS
    - Angular Version was 14.0.5
3. Create an Angular application for Basic Authentication.

Future:

1. Automate all in one single file execution.
2. Data put in User collection is not unique. That is database accepts duplicates.
3. Add Nodemon to server.js

Ref:

https://www.youtube.com/watch?v=i7tTwv4WVn0

******--------

FRONTEND:
========
******--------

Part 1:
=====
1. Create a Dockerfile locally with below contents inside the file.

FROM node:16.15.0-alpine
LABEL desc="docker image of angular 13 for Authentication app"
RUN npm install -g @angular/cli@13.3.8
WORKDIR /frontend

2. Using the above contents, run the below command, for creating the image.

	docker build -f ./Dockerfile.dev -t ngauth_frontend:0.1 .

3. Now using the custom image we created, run a container, using a container name(ng_auth_frontend), binding a volume in source and destination

docker run -itd -v ${PWD}:/frontend --name ng_auth_frontend ngauth_frontend:0.1

4. From the running container(ng_auth_frontend), create new Angular Project.

	docker exec -it ng_auth_frontend ng new events --directory=.

5. Now remove the container

docker run -itd -v ${PWD}:/frontend --name ng_auth_frontend ngauth_frontend:0.1
- For Running the built image.(given name for container - ng_auth_frontend, check the name of the image, and tag)
docker exec -it ng_auth_frontend ng new events --directory=.
- For creating New Angular app “events”

Now, locally we have created the angular app with specific Node & Angular version.

6. (Optional) if need to change the permission, execute as below,

sudo chown -R $USER:$(id -gn $USER) ./*

7. Remove the container.

	docker rm -f <container-name>

Part 2:
=====

1. Create a Dockerfile.dev locally with below contents inside the file.

FROM node:16.15.0-alpine
WORKDIR /frontend
COPY package.json ./
RUN npm install -g @angular/cli@13.3.8
RUN npm install
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]

2. Now, create a docker-compose.yaml file and content as below,

version: "3"
services:
  web:
    build: .
    ports: 
      - "4200:4200"
    volumes:
      - "/frontend/node_modules"
      - ".:/frontend"

3. Now run the following command,
	docker-compose up

4. It will hit up with error as below,

failed to solve: rpc error: code = Unknown desc = failed to solve with frontend dockerfile.v0: failed to read dockerfile: open /var/lib/docker/tmp/buildkit-mount478467770/Dockerfile: no such file or directory

The above error is due to dockerfile path or name is wrong, where the build filed is modified to as below,

    build:
      dockerfile: "Dockerfile.dev"

5. To create a component or service in the container,

	docker-compose exec ngauthweb ng g c xyz

6. To run the docker-compose command in detatched mode,

	Docker-compose up -d

Backend:
=======

Part 1:
======

1. Create base image with a docker node js version.
    
    docker build -f Dockerfile.dev -t baseimagenodejs:0.1 .

2. Run the image as container and name it.

    docker run -itd -v ${PWD}:/backend --name ng_auth_backend baseimagenodejs:0.1

 3. Initialize the Container with Express js installation.

    docker exec -it ng_auth_backend npm i -g express@4.17.3 --directory=.
    (Optional for updating npm) - npm install -g npm@8.13.2

 4. Install express and body parser to the container.

    docker exec -it ng_auth_backend npm i express body-parser --save --directory=.

    Now, locally, we have created backend server express, body-parser

 5. (Optional) if need to change the permission, execute as below,

sudo chown -R $USER:$(id -gn $USER) ./*

 6. Remove the container.

	docker rm -f <container-name>

Part 2:
======

1. Create a Dockerfile.dev locally with below contents inside the file.

FROM node:16.15.0-alpine
WORKDIR /backend
COPY package.json ./
RUN npm i -g express@4.17.3
RUN npm i express@4.17.3 body-parser --save
EXPOSE 3000
CMD ["node", "server"]

2. Now, create a docker-compose.yaml file and content as below,

version: "3"
services:
  web:
    build: .
    ports: 
      - "3000:3000"
    volumes:
      - "/backend/node_modules"
      - ".:/backend"

3. Now run the following command,
	docker-compose up

4. It will hit up with error as below,

failed to solve: rpc error: code = Unknown desc = failed to solve with frontend dockerfile.v0: failed to read dockerfile: open /var/lib/docker/tmp/buildkit-mount478467770/Dockerfile: no such file or directory

The above error is due to dockerfile path or name is wrong, where the build filed is modified to as below,

    build:
      dockerfile: "Dockerfile.dev"

//5. To create a component or service in the container,

//	docker-compose exec ngauthweb ng g c xyz

6. To run the docker-compose command in detatched mode,

	Docker-compose up -d

NOTE: mistakes learned.
1. always created a file locally and execute the docker-compose command.
2. so that it avoids creating the content in yml file.

Future:
======

1. How to give name of the container using docker-compose file, as image name was created as below ?
    image: base_express_server

Other Commands for reference:
===================
### To re-build the container/running container.
  ```docker-compose up -d --build``` 
### To not run the docker image as container in detatched mode for debugging
  ```docker-compose up --build```
### To list images
  ```docker images```
### remove image by image ID.
  ```docker image rm <imageID>``` 
### for removing the container ID.
  ```docker rm <containerID>``` 
docker build -f ./Dockerfile.dev -t ngauth_frontend:0.1 .
docker ps #runningcontainers
docker stop <containerID>
docker container prune #removes all stopped containers
docker run -t ngauth_frontend:0.1 #run the container - doubtful
docker exec -it ngauthserver cat package.json #access ruuning container and execute command

# Thoughts

## Problem:
===========
When installing packages, running npm command in container installs and it reflects locally as well.
But, when installing locally, why it is NOT affecting in container ?

================ Angular Authentication Project Complete ================
