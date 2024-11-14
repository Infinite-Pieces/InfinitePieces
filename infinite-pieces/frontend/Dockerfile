FROM node:20.14.0-buster as build

WORKDIR /app/frontend

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
