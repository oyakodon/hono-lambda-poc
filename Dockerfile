# Build stage
FROM public.ecr.aws/lambda/nodejs:20-arm64 AS builder

# Copy package files
COPY package*.json ${LAMBDA_TASK_ROOT}/

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source files and configs
COPY src/ ${LAMBDA_TASK_ROOT}/src/
COPY vite.config.ts tsconfig.json tailwind.config.js postcss.config.js components.json ${LAMBDA_TASK_ROOT}/

# Build client and server
WORKDIR ${LAMBDA_TASK_ROOT}
RUN npx vite build --mode client && npx vite build

# Production stage
FROM public.ecr.aws/lambda/nodejs:20-arm64

# Copy package files
COPY package*.json ${LAMBDA_TASK_ROOT}/

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built files from builder stage
COPY --from=builder ${LAMBDA_TASK_ROOT}/dist/ ${LAMBDA_TASK_ROOT}/dist/

# Set the Lambda handler
CMD ["dist/index.handler"]
