## Demos:

### reCAPTCHA v2
Playground: https://igops-tutorials-njs-recaptcha-react-v2-gpcwghuo2q-nw.a.run.app

Video: https://cs.igops.me/4Ljy97rb

### reCAPTCHA v3
Playground: https://igops-tutorials-njs-recaptcha-react-v3-gpcwghuo2q-nw.a.run.app

Video: https://cs.igops.me/mNJjZ81G

## Build instructions:

### 1. Build for the local usage

#### 1.1. Create .env file:
```
$ cp .env.dist .env
```
Populate it with your own values.

#### 1.2. Download localhost.direct SSL certificates:
```
$ curl -o localhost.direct.zip -LOs https://aka.re/localhost \
  && unzip -P localhost -d nginx/certs localhost.direct.zip \
  && rm localhost.direct.zip
```
What is [localhost.direct](https://get.localhost.direct)?


#### 1.3. Build the image:
```
$ docker build -t njs-recaptcha-react \
  --build-arg NGINX_SSL=true \
  --build-arg NGINX_SSL_DOMAIN=localhost.direct \
  --build-arg NGINX_PORT=80 \
  .
```

#### 1.4. Run the container:
```
$ docker run --rm \
  --name njs-recaptcha-react \
  -p 80:80 \
  -p 443:443 \
  -v $(pwd)/nginx/certs/localhost.direct.crt:/etc/nginx/certs/localhost.direct.crt \
  -v $(pwd)/nginx/certs/localhost.direct.key:/etc/nginx/certs/localhost.direct.key \
  -e RECAPTCHA_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
  -e RECAPTCHA_ACTION=unlock_photo \
  njs-recaptcha-react
```


### 2. Build without SSL termination:

E.g., Cloud Run, Kubernetes behind the load balancer, etc. 

#### 2.1. Create .env file:
```
$ cp .env.dist .env
```
Populate it with your own values.

#### 2.2. Build the image:
```
$ docker build -t njs-recaptcha-react:latest \
  --build-arg NGINX_SSL=false \
  --build-arg NGINX_PORT=80 \
  .
```

#### 2.3. Specs:
```
Listen on port: 80
Environment variables:
  RECAPTCHA_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  RECAPTCHA_ACTION=unlock_photo
```
