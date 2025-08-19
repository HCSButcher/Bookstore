# 📖 Bookstore Mobile App

A social mobile application where users can create accounts, share their favorite books, and recommend them to friends and the community.  
Other users can then **discover books**, **explore recommendations**, and **experience curated content** shared by fellow readers.  

---

## ✨ Features

- 👤 User authentication (account creation & login)  
- 📚 Share books you love with descriptions & recommendations  
- 🤝 Engage with a community of readers  
- 🔍 Search & discover new books recommended by others  
- 📱 Mobile-first design powered by **React Native + Expo**  

---

## 🛠️ Tech Stack

- **Frontend**: React Native (Expo)  
- **Backend**: Node.js + Express  
- **Database**: MongoDB Atlas  
- **Authentication**: JWT (JSON Web Tokens)  
- **Hosting**: Backend on Render 

---

## ⚙️ DevOps & System Design

- **Deployment**:  
  - Backend deployed via Render 
  - Expo build for mobile (Android/iOS)  
- **Monitoring & Observability**:  
  - Logs via backend middleware  
  - Monitoring with MongoDB Atlas dashboards  
  - Error tracking with Expo + backend logs  
- **System Design Principles Applied**:  
  - RESTful API between mobile app & backend  
  - Stateless server for horizontal scaling  
  - Secure storage of user credentials (JWT)  
  - Database normalization with indexing for book searches  

---

## 🗄️ Database (MongoDB Atlas)

The app uses **MongoDB Atlas** for storing user accounts and book data.

### 🔌 Connecting to MongoDB Atlas

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.  
2. Setup a cluster and whitelist IP or allow `0.0.0.0/0`.  
3. Create a database user.  
4. Copy your **MongoDB URI**:
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bookstoreDB

5. Add it to your backend `.env` file:

MONGODB_URI="mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/bookstoreDB"
PORT=5000
JWT_SECRET="yoursecretkey"

6. Example backend connection (`db.js`):

```js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;

🧪 Tests

The app has unit tests and integration tests.

✅ Unit Tests

React Native component rendering (BookCard, Profile, etc.)

Utility functions (formatting book data, token handling)

🔗 Integration Tests

Authentication endpoints (/api/auth/register, /api/auth/login)

Book APIs (/api/books/share, /api/books/recommendations)

MongoDB CRUD operations

📊 Test Results
PASS  tests/components/BookCard.test.js
PASS  tests/api/auth.test.js
PASS  tests/api/books.test.js

Test Suites: 3 passed, 3 total  
Tests:       25 passed, 25 total  
Snapshots:   0 total  
Time:        6.821s

🚀 Getting Started
Prerequisites

Node.js >= 18

npm or yarn

MongoDB Atlas cluster

Expo CLI (npm install -g expo-cli)

Installation
# Clone the repository
git clone https://github.com/HCSButcher/Bookstore.git

# Navigate into the project
cd bookstore-app

1. Backend Setup
cd backend
npm install


Create .env file in backend:

MONGODB_URI="your-mongodb-uri-here"
PORT=5000
JWT_SECRET="yoursecretkey"


Run the backend:

npm run dev

2. Mobile Frontend Setup
cd frontend
npm install


Start the app with Expo:

expo start


Scan the QR code in Expo Go app (iOS/Android) to run the mobile app.

📬 Feedback

This project is open for contributions.
If you’d like to collaborate, open a PR or raise an issue.

For direct inquiries, see my portfolio.

