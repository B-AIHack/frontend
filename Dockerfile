FROM --platform=linux/amd64 node:18-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN pnpm install

COPY . .
RUN pnpm run build

FROM --platform=linux/amd64 nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/config/nginx.conf /etc/nginx/nginx.conf


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]