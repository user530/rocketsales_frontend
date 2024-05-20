# Build stage
FROM node:current-alpine3.19 AS build

WORKDIR /build

COPY package*.json .

RUN npm install

COPY . .

# Setup env variables
ARG API_BASE_URL
ARG API_CACHE_EXP_MIN

ENV VUE_APP_API_BASE_URL=${API_BASE_URL}
ENV VUE_APP_API_CACHE_EXP_MIN=${API_CACHE_EXP_MIN}

RUN npm run build

# Production stage
FROM nginx:stable-alpine as production

COPY --from=build /build/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
