# BlogAPI

A RESTful Blog API built with **Node.js**, **Express.js**, and **MongoDB** that enables users to create, manage, and interact with blog posts securely using JWT authentication.

## 🚀 Features

- 🔐 User authentication with JWT
- 👤 User registration and login
- ✍️ Create, update, and delete blog posts
- 📖 Retrieve all posts or a single post
- 💬 Add and manage comments
- ❤️ Like and unlike blog posts
- 🔍 Search and filter blog posts
- 🛡️ Protected routes with authentication middleware
- ✅ Request validation and centralized error handling

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- dotenv

## 📦 Installation

### Prerequisites

- Node.js (v18 or later)
- MongoDB Atlas or a local MongoDB instance
- npm

### Clone the Repository

```bash
git clone https://github.com/kachi-jasperD/BlogAPI.git
cd BlogAPI
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root and add:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Start the Development Server

```bash
npm run dev
```

### Start the Production Server

```bash
npm start
```

---

## 📚 API Documentation

The complete API documentation is available on Postman:

👉 **https://documenter.getpostman.com/view/2449601/2sBY4SMz4r**

The documentation includes:

- Authentication
- Available endpoints
- Request & response examples
- Parameters
- Error responses
- Status codes

---

## 📁 Project Structure

```text
BlogAPI/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
├── server.js
├── package.json
└── README.md
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign JWTs |

---

## 🔒 Authentication

Protected endpoints require a JWT access token.

Include the token in the request headers:

```http
Authorization: Bearer <your_token>
```

---

## 🧪 Running Tests

```bash
npm test
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push to GitHub.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Jasper D. Kachi**

- GitHub: https://github.com/kachi-jasperD
- API Docs: https://documenter.getpostman.com/view/2449601/2sBY4SMz4r