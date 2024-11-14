FROM node:20.14.0-buster as build

WORKDIR /app/backend

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
