#STAGE 1:
#This handles building the react application
#Pulls down the node.js image template
FROM node:20-alpine AS builder

#Sets the working directory for the container
WORKDIR /app

#Copies the package files that tell docker what external dependencies and libaries are needed
#You don't have to copy them over again due to docker's layering functionality
COPY package*.json ./

#Installs needed project dependencies based on the package-lock.json data
#This is needed because the external files that represent these dependencies are ignored by docker due to size and time to download
RUN npm ci

#Copies all of the files from the project directory into the working directory
#For the docker container
COPY . .

#Builds the react application into a full production ready build that can
#be used by web browsers
RUN npm run build

#STAGE 2:
#Copying the application into a nginx web server for better performance
FROM nginx:1.25-alpine

#Removes default welcome pages
RUN rm -rf /usr/share/nginx/html/*

#Copying the web assets that will be served to browser to the nginx server
COPY --from=builder /app/build /usr/share/nginx/html/*

#Exposing port 5173 within the container
EXPOSE 5173

#Setting the command that runs the nginx server immediately after the docker container is running
CMD ["nginx","-g","daemon off;"]

