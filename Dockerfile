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

ENV NODE_ENV=production
ENV PORT=8080

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Copy Prisma Client generated in builder stage
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy compiled application
COPY --from=builder /app/dist ./dist

# Copy Prisma schema/config
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

# Cloud Run listens on port 8080
EXPOSE 8080

# Start production application
CMD ["node", "dist/src/main.js"]