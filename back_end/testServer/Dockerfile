FROM node:10-alpine

WORKDIR /main

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4010

CMD ["npm","start"]