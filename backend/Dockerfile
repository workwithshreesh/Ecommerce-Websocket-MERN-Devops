FROM node:22

# Create app dir
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

# Install deps
RUN npm install

COPY . .

RUN mkdir -p /usr/src/app/uploads \
    && chown -R node:node /usr/src/app/uploads /usr/src/app/node_modules

# Use non-root user for safety
USER node

# Expose your app port
EXPOSE 3000

CMD ["node", "server.js"]
