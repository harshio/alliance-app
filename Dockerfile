FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY build/ ./

COPY nginx.conf /etc/nginx/nginx.conf