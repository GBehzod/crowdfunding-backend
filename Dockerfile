FROM node:20.1-alpine3.17 as builder

WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies with yarn
RUN yarn install

# Copy the rest of your application's code
COPY . .

# Build your application
RUN yarn run build

FROM node:20.1-alpine3.17 as production
RUN apk update && apk upgrade

# Create the necessary directory structure and set permissions
RUN mkdir -p /var/www/app/uploads && \
    chown -R node:node /var/www/app && \
    chmod -R 755 /var/www/app/uploads

WORKDIR /var/www/app

# Install npm and pm2 globally
RUN npm install -g pm2

# Copy package.json, yarn.lock, and process.yml
COPY package.json  yarn.lock  ./

USER node

# Install production dependencies only
RUN yarn install --production

# Copy the build from the previous stage
COPY --from=builder --chown=node:node /app/build .

CMD ["pm2-runtime", "process.yml"]
