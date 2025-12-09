# Stage 1: build the NestJS application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
# Install dependencies
COPY TechHelpDesk/package*.json ./
RUN npm ci

# Copy source and build
COPY TechHelpDesk/ .
RUN npm run build
RUN ls -R /app/dist

# Remove dev dependencies for slimmer runtime
RUN npm prune --omit=dev

# Stage 2: lightweight runtime image
FROM node:20-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Copy only the necessary artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]

