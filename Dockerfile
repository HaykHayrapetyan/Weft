FROM node:18-alpine as base

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --pure-lockfile --non-interactive
COPY . .
RUN npm run build

# Development image
FROM base as development

ENV NODE_ENV=development

CMD ["npm", "run", "start:dev"]

#Production image
FROM base as production

ENV NODE_ENV=production

ENV PORT=4000

EXPOSE ${PORT}

CMD ["npm", "run", "start"]