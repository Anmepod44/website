# ---------- Dockerfile (production-ready, supports build or dist) ----------
# Build stage
FROM node:20-alpine AS builder

# Tools needed for some packages and compression
RUN apk add --no-cache python3 make g++ curl brotli gzip

WORKDIR /app

# copy package files for cache
COPY package.json package-lock.json* ./
RUN npm ci --production=false

# copy source and build
COPY . .

ENV NODE_ENV=production
 
# Build the app (will produce either "build/" or "dist/" depending on your vite config)
RUN npm run build

# Helpful debug info during image build
RUN echo ">>> PROJECT ROOT:" && ls -la /app || true
RUN echo ">>> BUILD DIRS (root):" && ls -la /app/build || true
RUN echo ">>> DIST DIR (root):" && ls -la /app/dist || true

# Compression step — configurable build dir (default to `build`)
ARG BUILD_DIR=build
RUN if [ -d "$BUILD_DIR" ]; then \
      echo "Precompressing files in $BUILD_DIR"; \
      find "$BUILD_DIR" -type f \( -iname '*.js' -o -iname '*.css' -o -iname '*.html' -o -iname '*.svg' -o -iname '*.json' \) -print0 \
        | xargs -0 -n1 -P4 -I{} sh -c 'gzip -9 -c "{}" > "{}.gz" && brotli -q 11 -f -o "{}.br" "{}"'; \
    elif [ -d "dist" ]; then \
      echo "Precompressing files in dist"; \
      find dist -type f \( -iname '*.js' -o -iname '*.css' -o -iname '*.html' -o -iname '*.svg' -o -iname '*.json' \) -print0 \
        | xargs -0 -n1 -P4 -I{} sh -c 'gzip -9 -c "{}" > "{}.gz" && brotli -q 11 -f -o "{}.br" "{}"'; \
    else \
      echo "No build or dist directory found — skipping pre-compression"; \
    fi
 
# ---------- Production stage ----------
FROM nginx:stable-alpine

# Remove default config and use your own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Accept build directory as build arg at image build time
ARG BUILD_DIR=build

# copy built assets (try BUILD_DIR first, fallback to dist)
COPY --from=builder /app/${BUILD_DIR} /usr/share/nginx/html

# ensure correct ownership
RUN chown -R nginx:nginx /usr/share/nginx/html || true

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- --timeout=2 http://localhost/ || exit 1

# run nginx (default entrypoint)
