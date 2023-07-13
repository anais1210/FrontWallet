FROM node:16.17.1-alpine AS builder

WORKDIR /app/front

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build
CMD ["npm", "start"]

# FROM node:16.17.1-alpine AS prod

# WORKDIR /app/front

# COPY package.json .
# COPY package-lock.json .

# RUN npm install

# COPY --from=builder /app/front/build .

# EXPOSE 3000

# CMD ["npm", "start"]