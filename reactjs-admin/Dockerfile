# Khai báo ARG để Docker biết bạn sẽ truyền các giá trị này trong quá trình build
ARG VITE_API_CRAWLER_URL
ARG VITE_API_URL

# Đặt các giá trị ARG vào môi trường ENV để ứng dụng có thể sử dụng
ENV VITE_API_CRAWLER_URL=$VITE_API_CRAWLER_URL
ENV VITE_API_URL=$VITE_API_URL

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
