FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm config set strict-ssl false && npm install
COPY . .
ENV PORT=4003
EXPOSE 4003
CMD ["node", "server.js"]
