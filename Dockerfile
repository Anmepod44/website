FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Explicit build step
RUN npm run build

# -----------------------------------------

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

# Copy from the first stage (folder is now 'build')
COPY --from=build /app/build ./build

EXPOSE 3000 

CMD ["serve", "-s", "build", "-l", "3000"]
