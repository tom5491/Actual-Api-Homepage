FROM node:18

WORKDIR /usr/src/app

# Install dependencies for native modules
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libsqlite3-dev

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5007

CMD ["node", "index.js"]