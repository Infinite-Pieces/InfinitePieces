FROM node:20.14.0-buster as build


WORKDIR /app/backend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
