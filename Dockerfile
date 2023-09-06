FROM node:18.17.1-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV TZ=Asia/Tokyo

COPY . .

RUN yarn install --production
RUN yarn build

CMD yarn start
