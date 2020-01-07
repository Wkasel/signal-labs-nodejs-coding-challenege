# from base image node
FROM node:8.11-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY package.json .

# install all dependencies
RUN npm install

# copy other files as well
COPY ./ .

#expose the port
EXPOSE 3000

# command to run to launch image
CMD ["npm","start"]