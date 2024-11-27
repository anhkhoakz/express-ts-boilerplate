# syntax=docker.io/docker/dockerfile:1

FROM node:20-bullseye-slim@sha256:f15d13991e8acd23eeefd4ec0b73ef5608c6195be53cd2847c6c022932ce5e7f AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Copy application source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app (optional if your Express app needs a build step, e.g., TypeScript)
RUN \
    if [ -f tsconfig.json ]; then npm run build; \
    else echo "No build step needed"; \
    fi

# Production image, copy all the necessary files
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only required files for production
COPY --from=builder /app/node_modules ./node_modules

# Adjust this if your build output is in a different directory
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Run as a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

# Expose the port your application will run on
EXPOSE 5000

# Environment variables for production
ENV PORT=5000
ENV HOSTNAME="0.0.0.0"

# Start the Express.js server
CMD ["node", "dist/index.js"]
