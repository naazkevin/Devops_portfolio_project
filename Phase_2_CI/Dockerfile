# --- STAGE 1: Build & Dependency Installation ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package definitions first to leverage Docker layer caching
COPY package*.json ./

# Install all production and development dependencies
RUN npm install

# Copy the rest of your application code
COPY . .


# --- STAGE 2: Lightweight Production Runtime ---
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment flags
ENV NODE_ENV=production

# Copy only the necessary node_modules and code from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Expose the internal port your app listens on
EXPOSE 3000

# Run the application as a non-root user for security hardening
USER node

CMD ["node", "server.js"]
