# Stage 1: Build ứng dụng Next.js
FROM node:18-alpine AS builder

# Khai báo ARG để Docker nhận các giá trị này khi build
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_FRONT_END_URL
ARG NODE_ENV

# Đặt các giá trị ARG vào môi trường ENV để ứng dụng có thể sử dụng
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_FRONT_END_URL=$NEXT_PUBLIC_FRONT_END_URL
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

# Copy package.json và package-lock.json trước để cài đặt dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile  # Cài đặt tất cả dependencies, bao gồm devDependencies

# Copy toàn bộ mã nguồn và build ứng dụng
COPY . .
RUN npm run build

# Stage 2: Chạy ứng dụng Next.js
FROM node:18-alpine

WORKDIR /app

# Copy các file build từ stage 1 vào container
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Cài đặt các dependencies cần thiết cho môi trường production
RUN npm install --production  # Chỉ cài đặt dependencies cần thiết cho production

EXPOSE 3500

# Lệnh để khởi chạy ứng dụng
CMD ["npm", "start"]
