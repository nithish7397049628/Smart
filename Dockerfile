# Smart City 360 - Production Multi-Stage Dockerfile
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache libc6-compat

# Copy package manifests
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Ensure upload directory exists with write permissions
RUN mkdir -p backend/uploads && chown -R node:node /app

# Switch to non-root user for security
USER node

# Expose server port
EXPOSE 3000

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "backend/server.js"]
