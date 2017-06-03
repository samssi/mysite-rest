FROM node:argon

# Create app directory
RUN mkdir -p /mysite/app
WORKDIR /mysite/app

# Install app dependencies
COPY package.json /mysite/app/
RUN npm install

# Bundle app source
COPY . /mysite/app

RUN chown -R node:node /mysite

USER node
ENV HOME /mysite/app

EXPOSE 8090

CMD ["npm", "start" ]
