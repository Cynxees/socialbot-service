# base stage to have bun installed
FROM node:20 AS base
RUN npm i -g bun
WORKDIR /usr/src/app

# install dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# build application
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV APP_ENV=production
RUN bun run build

# production release
FROM prerelease AS release
CMD ["bun", "dist/main.js"]

# development environment
FROM base AS dev
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
RUN bun add nodemon --dev
COPY . .
CMD ["bun", "run", "nodemon", "-L", "--watch", "src", "--exec", "bun", "run", "start:dev"]
