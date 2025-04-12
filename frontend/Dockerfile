# Development image
FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Environment variables
ENV NODE_ENV=development
ENV NEXT_PUBLIC_API_URL=http://backend:4000/graphql

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
