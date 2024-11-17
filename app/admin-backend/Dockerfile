FROM node:20.14.0-buster as build


WORKDIR /app/admin-backend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 6000

CMD ["npm", "start"]
