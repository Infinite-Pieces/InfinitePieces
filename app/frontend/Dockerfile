FROM node:20.14.0-buster as build

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ls -la /app/frontend/dist

FROM nginx:stable-alpine

COPY --from=build /app/frontend/dist /usr/share/nginx/html

COPY --from=build /app/frontend/public /usr/share/nginx/html/public

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
