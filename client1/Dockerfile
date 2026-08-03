FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Set the command to run the app
CMD ["serve", "-s", "build", "-l", "5000"]

EXPOSE 5000