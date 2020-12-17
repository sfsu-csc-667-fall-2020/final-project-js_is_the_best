FROM node:10-alpine

WORKDIR /main

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm","start"]