FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm config set strict-ssl false && npm install
COPY . .
ENV PORT=4002
EXPOSE 4002
CMD ["node", "server.js"]
