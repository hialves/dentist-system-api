FROM node:16-alpine

WORKDIR /usr/app
COPY package*.json /usr/app/
RUN npm install --only=production --quiet
COPY . /usr/app/

EXPOSE 80

CMD [ "yarn", "prod" ]