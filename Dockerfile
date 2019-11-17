FROM docker.io/node:12-alpine

WORKDIR /app

ENV HOST=0.0.0.0 \
    PORT=8080 \
    APP_KEY=n96M1TPG821EdN4mMIjnGKxGytx9W2UJ \
    NODE_ENV=development \
    APP_NAME=AdonisJs \
    APP_URL=http://${HOST}:${PORT} \
    CACHE_VIEWS=false \
    DB_CONNECTION=sqlite \
    DB_DATABASE=adonis \
    DB_HOST= \
    DB_PORT= \
    DB_USER= \
    DB_PASSWORD= \
    HASH_DRIVER=bcrypt \
    IS_CREATION_ENABLED=true \
    CONNECT_WITH_FRANZ=true

COPY package*.json ./

RUN npm i -g @adonisjs/cli

RUN npm install

COPY . .

RUN ln -s /database/adonis.sqlite /app/database/adonis.sqlite

# ports and volumes
VOLUME /database /app/recipes

CMD [ "adonis", "serve" ]
