FROM node:22

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libsqlite3-dev

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5007

CMD ["node", "index.js"]