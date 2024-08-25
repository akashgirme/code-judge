FROM node:20-alpine

RUN apk add --no-cache build-base

WORKDIR /usr/src/monorepo

COPY apps/code-execution-engine/src/worker ./

RUN npm install

RUN npx tsc

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD [ "npm", "run", "start" ]