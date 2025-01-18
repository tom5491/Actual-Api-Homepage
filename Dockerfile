FROM node:18

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libsqlite3-dev

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${process.env.PORT}

CMD ["node", "index.js"]