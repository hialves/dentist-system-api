FROM node:16-alpine

WORKDIR /usr/app
ENV NODE_ENV=production
COPY package*.json /usr/app/
RUN npm install --only=production --quiet
COPY . /usr/app/

EXPOSE 80

CMD [ "yarn", "prod" ]