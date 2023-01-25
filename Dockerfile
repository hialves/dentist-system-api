FROM node:18-alpine

WORKDIR /usr/app
ENV NODE_ENV=production
COPY package.json /usr/app/
RUN npm install --only=production --quiet
COPY . /usr/app/

CMD [ "npm", "run", "prod" ]