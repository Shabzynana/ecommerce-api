FROM node:18

WORKDIR /app

# 3. Copy package files and install deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
