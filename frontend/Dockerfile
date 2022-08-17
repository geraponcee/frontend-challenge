FROM node:16.15.1-alpine as build-step

COPY . .

WORKDIR /app

RUN npm install --force

FROM nginx:1.22.0-alpine

COPY --from=build-step /app/dist/challenge /usr/share/nginx/html

COPY --from=build-step /nginx/default.conf /etc/nginx/conf.d/