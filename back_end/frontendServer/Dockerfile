FROM node:10-alpine

WORKDIR /main

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","start"]