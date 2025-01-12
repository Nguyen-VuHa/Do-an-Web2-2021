# Stage 1: Build ứng dụng Next.js
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# Stage 2: Chạy ứng dụng Next.js
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

RUN npm install --production

EXPOSE 3500

CMD ["npm", "start"]
