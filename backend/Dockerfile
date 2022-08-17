FROM node:16.15.1-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

CMD [ "npm", "start" ]

EXPOSE 8081