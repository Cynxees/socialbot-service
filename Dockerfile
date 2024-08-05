# base stage to have bun installed
FROM node:20 AS base
RUN npm i -g bun
WORKDIR /usr/src/app

# install dependencies
FROM base AS install
WORKDIR /temp/dev
COPY bun.lockb .
COPY package.json .
RUN bun install --frozen-lockfile

WORKDIR /temp/prod
COPY bun.lockb .
COPY package.json .
RUN bun install --frozen-lockfile --production

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
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile
COPY . .
CMD ["bun", "run", "start:dev"]
