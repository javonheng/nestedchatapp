# FROM mysql

# ENV MYSQL_ROOT_PASSWORD my-secret-pw
# ENV MYSQL_DATABASE tezos

# ADD ./initDb.sql /docker-entrypoint-initdb.d

# EXPOSE 3306

FROM node:16

WORKDIR /home/node/app

COPY package*.json ./
COPY wait-for-it.sh .

RUN npm install
COPY . .

EXPOSE 3001
