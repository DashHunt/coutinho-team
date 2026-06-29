FROM node:22-alpine

WORKDIR /training-api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
