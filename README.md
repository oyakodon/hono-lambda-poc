# hono-lambda-poc

A minimal SPA application using Hono and React, running on AWS Lambda.

## Getting Started

```bash
# Install dependencies
npm install
```

```bash
# Start development server (with HMR)
npm run dev
```

### Lint & Format

```bash
# Check (lint + format + auto-fix)
npm run check
```

## Docker Build

```bash
# Build for ARM64 architecture
docker build --platform linux/arm64 -t hono-lambda-poc . --provenance=false
```
