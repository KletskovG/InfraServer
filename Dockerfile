FROM node:16-alpine

# Create app dir
WORKDIR /usr/src/app

COPY package*.json /
RUN npm install
COPY dist/index.js dist/index.js

EXPOSE 3000

CMD ["node", "dist/index.js"];