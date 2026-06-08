# Sử dụng bản Node.js gọn nhẹ
FROM node:20-alpine

# Thư mục làm việc bên trong container
WORKDIR /app

# Copy các file quản lý thư viện vào trước để tận dụng Docker cache
COPY package.json package-lock.json ./

# Cài đặt thư viện
RUN npm install

# Copy file database schema vào và generate prisma client
COPY prisma ./prisma
RUN npx prisma generate

# Copy toàn bộ source code còn lại vào
COPY . .

# Mở port mà app đang chạy
EXPOSE 3069

# Lệnh khởi chạy server
CMD ["npm", "run", "start"]
