FROM node:18-slim

RUN npm install -g nodemon

WORKDIR /app

COPY ./package.json ./

RUN npm install


COPY . .

EXPOSE 7001

CMD ["npm", "run", "start"]