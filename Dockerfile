# ============================================
# Stage 1: Build
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy Prisma configuration
COPY prisma ./prisma
COPY prisma.config.ts ./

# Copy TypeScript / NestJS configuration
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Copy application source
COPY src ./src

# Generate Prisma Client
RUN npx prisma generate

# Build NestJS application
RUN npm run build


# ============================================
# Stage 2: Production
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

# Production environment
# NOTE:
# PORT is intentionally NOT defined here.
# Google Cloud Run automatically provides PORT=8080.
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev \
    && npm cache clean --force

# Copy generated Prisma Client
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy compiled NestJS application
COPY --from=builder /app/dist ./dist

# Copy Prisma schema and configuration
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

# Documentation for container port.
# Cloud Run will provide PORT=8080 at runtime.
EXPOSE 8080

# Start NestJS production application
CMD ["node", "dist/src/main.js"]