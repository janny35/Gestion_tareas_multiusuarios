FROM node:18-alpine AS builds
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.0-alpine
COPY --from=builds /app/dist /usr/share/nginx/html
EXPOSE 80
