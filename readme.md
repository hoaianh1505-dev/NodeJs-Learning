## Hello bro
# NodeJS Learning Project

Project học Node.js + TypeScript  
Tác giả: Hazi_anhh  
Repo: https://github.com/hoaianh1505-dev/NodeJs-Learning

==================================================

## Công nghệ sử dụng
- Node.js        : Nền tảng chạy JavaScript phía server
- Express 5      : Framework xây dựng web server, routing, middleware
- TypeScript     : JavaScript có kiểu dữ liệu, dễ bảo trì, ít bug
- EJS            : Template engine để render HTML động
- MySQL          : Hệ quản trị cơ sở dữ liệu
- Nodemon        : Tự động restart server khi thay đổi code

==================================================

## Khởi tạo project
npm init -y
→ Tạo file package.json để quản lý project và thư viện

==================================================

## Cài thư viện chạy chính (dependencies)

npm install express ejs dotenv mysql2

Tác dụng từng package:
- express
  → Tạo server, xử lý request/response, routing, middleware

- ejs
  → Render giao diện HTML động phía server

- dotenv
  → Đọc biến môi trường từ file .env (PORT, DB_PASSWORD, SECRET...)

- mysql2
  → Kết nối và thao tác với cơ sở dữ liệu MySQL (nhanh hơn mysql cũ)

==================================================

## Cài thư viện hỗ trợ phát triển (devDependencies)

npm install --save-dev typescript ts-node nodemon tsconfig-paths

Tác dụng:
- typescript
  → Biên dịch TypeScript (.ts) sang JavaScript

- ts-node
  → Chạy trực tiếp file .ts không cần build trước

- nodemon
  → Tự động restart server khi code thay đổi (rất tiện khi dev)

- tsconfig-paths
  → Hỗ trợ alias path trong TypeScript (import gọn gàng hơn)

==================================================

## Cài type definitions cho TypeScript

npm install --save-dev @types/node @types/express @types/ejs

Tác dụng:
- @types/node
  → Cung cấp kiểu dữ liệu cho Node.js (fs, path, process...)

- @types/express
  → Gợi ý kiểu dữ liệu cho request, response, middleware

- @types/ejs
  → Hỗ trợ TypeScript khi dùng EJS

==================================================

## Danh sách package đã cài

dependencies:
- express        : 5.0.1
- ejs            : 3.1.10
- dotenv         : 16.4.7
- mysql2         : 3.12.0

devDependencies:
- typescript     : 5.7.3
- ts-node        : 10.9.2
- nodemon        : 3.1.9
- tsconfig-paths : 4.2.0
- @types/node    : 22.10.7
- @types/express: 5.0.0
- @types/ejs    : 3.1.5

==================================================

## Chạy project

Chạy môi trường dev:
npm run dev

Chạy bình thường:
npm run start

Chạy debug (inspect):
npm run start:debug

==================================================

## Ghi chú quan trọng
- File cấu hình môi trường: .env
- File khởi động server: src/app.ts
- Thư mục build output: dist/
- Nodemon tự theo dõi thư mục src để restart server

==================================================

## Ghi nhớ cho bản thân
- package.json = lịch sử install thư viện
- npm install = cài lại toàn bộ môi trường
- devDependencies chỉ dùng khi dev, không dùng khi production

==================================================

Happy coding 🚀
