FROM node:14

WORKDIR /app

ARG NPM_TOKEN

COPY package.json package-lock.json ./
RUN npm ci

COPY ./ ./
RUN npm run build

ENV NPM_TOKEN=fake-token
CMD npm run start
