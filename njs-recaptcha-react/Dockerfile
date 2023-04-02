FROM node as react-app

WORKDIR /app
COPY package*.json .
RUN npm install

COPY public public
COPY src src
COPY .env .env

RUN npm run build


FROM alpine as nginx-conf

# install required packages
RUN apk add --no-cache gomplate curl

RUN mkdir -p /etc/nginx/certs \
 && mkdir -p /etc/nginx/conf.d

# install Google's root certificate
RUN curl -o /etc/nginx/certs/google.pem -LOs https://pki.goog/repo/certs/gtsr1.pem

# parse server-blocks.conf template
WORKDIR /etc/nginx/conf.d

ARG NGINX_SSL=true
ARG NGINX_SSL_DOMAIN=localhost.direct
ARG NGINX_PORT=80

COPY nginx/server-blocks.conf ./default.conf
RUN gomplate -f ./default.conf -o ./default-parsed.conf -- \
    mv ./default-parsed.conf ./default.conf


FROM nginx:alpine

# enable njs
RUN  sed -i '1i load_module /etc/nginx/modules/ngx_http_js_module.so;' /etc/nginx/nginx.conf \
  && sed -i '2i load_module /etc/nginx/modules/ngx_stream_js_module.so;' /etc/nginx/nginx.conf

# copy nginx config
COPY --from=nginx-conf /etc/nginx/certs /etc/nginx/certs
COPY --from=nginx-conf /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# install React app
COPY --from=react-app /app/build /usr/share/nginx/html
# install njs app
COPY nginx/recaptcha-verify.js /etc/nginx/njs/recaptcha-verify.js

# set env placeholders
ENV RECAPTCHA_SECRET_KEY 'set-me-on-run'
ENV RECAPTCHA_ACTION 'set-me-on-run'

CMD ["nginx", "-g", "daemon off;"]
