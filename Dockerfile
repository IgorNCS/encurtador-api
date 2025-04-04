FROM node:latest as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .


RUN npm run build


FROM node:alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "dist/main"]