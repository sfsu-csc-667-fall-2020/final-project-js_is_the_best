FROM node:10-alpine

WORKDIR /main

COPY package.json .

RUN npm install

COPY . .

CMD ["node","index.js"]