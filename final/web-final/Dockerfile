FROM node:16-alpine

LABEL description="This Dockerfile is used to deploy the final project of web programming."
MAINTAINER Joey

ARG AXIOS_PORT=4000
ARG WSS_PORT=4001

EXPOSE ${AXIOS_PORT}-${WSS_PORT}

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install:prod
RUN yarn build

CMD ["yarn", "deploy"]