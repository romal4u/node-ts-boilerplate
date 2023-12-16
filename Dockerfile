FROM node:20-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install --save-dev typescript @types/node && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:watch"]