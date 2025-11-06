FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm config set strict-ssl false && npm install
COPY . .
ENV PORT=4001
EXPOSE 4001
CMD ["node", "server.js"]
