# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source
COPY . .

# Build Next.js app
RUN npm run build

# Stage 2: Run app
FROM node:lts-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install only prod dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy build artifacts
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json ./
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src src

# Expose port
EXPOSE 3000

# Run Next.js
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]