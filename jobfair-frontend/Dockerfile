FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (assuming your application listens on this port)
EXPOSE 3000

# Generate Prisma client
RUN npx prisma generate

# Set environment variables
ENV PORT=3000

ENV DATABASE_URL="mongodb+srv://admin:admin@cluster0.tmxqokf.mongodb.net/JobFair?retryWrites=true&w=majority"
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME='db7mxkkto'
ENV NEXTAUTH_SECRET='Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY='
ENV GITHUB_ID='465ac2ee3732d8911e93'
ENV GITHUB_SECRET='3b1d0825a3a34f88d7a4434bac422117dda213e1'
ENV GOOGLE_CLIENT_ID='261047677045-f0t3r3m2t0peit4uj1hijl0on15jrp4e.apps.googleusercontent.com'
ENV GOOGLE_CLIENT_SECRET='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'
# Add other environment variables as needed

# Start the application
CMD [ "npm", "run", "dev" ]
