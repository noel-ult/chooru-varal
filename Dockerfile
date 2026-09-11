FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Docker builds to the standard directory used by `next start`.
RUN NEXT_DIST_DIR=.next npx next build

EXPOSE 3000
CMD ["npm", "start"]
