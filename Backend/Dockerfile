# ==============================
# Stage 1: Build dependencies and generate Prisma client
# ==============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for Docker cache optimization
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for Prisma generate)
RUN npm ci --legacy-peer-deps

# Copy Prisma schema and generate client
COPY prisma ./prisma
COPY prisma.config.ts ./
ENV DATABASE_URL="mysql://dummy:dummy@localhost:3306/dummy"
RUN npx prisma generate

# Prune devDependencies to keep production image light
RUN npm prune --omit=dev --legacy-peer-deps

# ==============================
# Stage 2: Production image
# ==============================
FROM node:20-alpine AS production

# Security: run as non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

WORKDIR /app

# Copy node_modules and generated Prisma client from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copy source code
COPY . .

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

# Expose port
EXPOSE 3069

# Health check - Railway will use this to verify the service is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3069/health || exit 1

# Start server
CMD ["node", "server.js"]
