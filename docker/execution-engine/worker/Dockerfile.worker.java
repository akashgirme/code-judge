FROM node:20-alpine AS build

RUN apk add --no-cache openjdk11-jdk coreutils bash

WORKDIR /usr/src/monorepo

COPY package*.json ./
RUN npm install

COPY . .

RUN npx nx reset

RUN npx nx build worker

FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/monorepo

COPY apps/execution-engine/worker/package*.json ./

RUN npm install --omit=dev

COPY --from=build /usr/src/monorepo/dist ./dist

CMD [ "node", "dist/apps/execution-engine/worker/main" ]
