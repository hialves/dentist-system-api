FROM node:16-alpine

WORKDIR /usr/app
COPY package*.json /usr/app/
RUN yarn install
COPY . /usr/app/

EXPOSE 80

CMD [ "yarn", "prod" ]