FROM node:18.20.4-alpine

WORKDIR /app

ARG RESAS_API_KEY

ENV NODE_ENV=production
ENV TZ=Asia/Tokyo
ENV RESAS_API_KEY=${RESAS_API_KEY}

COPY . .

RUN yarn install --production
RUN yarn build

CMD yarn start
