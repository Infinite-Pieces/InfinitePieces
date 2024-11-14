FROM node:20.14.0-buster as build

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
