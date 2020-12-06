FROM node:10-alpine

WORKDIR /main

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm","start"]