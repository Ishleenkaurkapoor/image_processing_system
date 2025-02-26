# 📂 Image Processing API

This is an **Express.js-based API** that allows users to upload a CSV file containing image URLs, process images, and retrieve results. It also includes **Swagger API documentation** for easy exploration.

## 🚀 Features
- Upload CSV files via `POST /api/upload`
- Process images asynchronously
- Retrieve processing status
- Integrated **Swagger UI** (`/api-docs`) for API testing
- Uses **Multer** for file handling

---

## 📦 Installation

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-repo/image-processing-api.git
cd image-processing-api

2️⃣ Install dependencies

npm install

3️⃣ Set up environment variables
Create a .env file in the root directory and configure it:

DB_HOST=localhost
DB_PORT=3306
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=your-db-name
REDIS_HOST=redis-client-host
REDIS_PASSWORD=your-redis-password
REDIS_PORT=your-redis-port

4️⃣ Run the application

npm start

📜 Swagger API Documentation
You can explore and test API endpoints using Swagger UI.

Start the server: npm start
Open your browser and visit:
http://localhost:5000/api-docs

📂 Project Structure
bash
Copy
Edit
📦 image-processing-api
│-- 📂 src
│   │-- 📂 routes
│   │   ├── uploadRoutes.js   # Upload-related routes
│   │-- 📂 controllers
│   │   ├── uploadController.js   # Handles CSV uploads
│   │-- 📂 config
│   │   ├── swagger.js   # Swagger setup
│   ├── app.js           # Main application file
│-- .env                 # Environment variables
│-- package.json         # Project dependencies
│-- README.md   

📌 Technologies Used
Backend: Node.js, Express.js
Database: MySQL (Sequelize ORM)
File Handling: Multer
API Documentation: Swagger UI
Job Queue: BullMQ (Redis)
Image Processing: Sharp


💡 Future Enhancements
✅ Store processed images in AWS S3
✅ Add WebSocket for real-time status updates
✅ Support different image formats & resolutions
