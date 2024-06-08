FROM nginx:1.27.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/curious-martian-rover/browser/ /usr/share/nginx/html