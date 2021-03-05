FROM node:14.16

WORKDIR /app/back

COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn

COPY . .