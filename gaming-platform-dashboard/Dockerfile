FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm config set strict-ssl false && npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]