FROM node:22.21.1

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies as root
RUN npm install

# Copy rest of backend code
COPY . .

# Ensure node can write to uploads folder only
RUN mkdir -p /usr/src/app/uploads \
    && chown -R node:node /usr/src/app/uploads

# Switch to non-root
USER node

EXPOSE 3000

COPY wait-for-it.sh /usr/src/app/
USER root
RUN chmod 755 /usr/src/app/wait-for-it.sh


CMD ["node", "server.js"]
