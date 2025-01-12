# Stage 1: Build ứng dụng React
FROM node:16-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Chạy ứng dụng React bằng một server nhỏ
FROM node:16-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve

# Expose cổng 3000 để phục vụ ứng dụng
EXPOSE 4000

# Lệnh chạy ứng dụng bằng serve
CMD ["serve", "-s", "dist", "-l", "4000"]
