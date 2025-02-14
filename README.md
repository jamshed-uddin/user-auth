# User auth server

This is a server for user authentication and searching user.

### Postman documentation

[https://documenter.getpostman.com/view/29126982/2sAYXECxby](https://documenter.getpostman.com/view/29126982/2sAYXECxby)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Packages and Dependencies](#packages-and-dependencies)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You need to have Node.js installed. You can download it from [here](https://nodejs.org/).
- **MongoDB**: You need a MongoDB database. You can set up a local MongoDB server or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Git**: Ensure you have Git installed for cloning the repository. You can download it from [here](https://git-scm.com/).

## Installation

1.**Clone the repository:**

```bash
 git clone https://github.com/jamshed-uddin/user-auth.git
 cd user-auth
```

2.**Install the packages**

```bash
 npm install
```

3.**Setup environment variables**
Create a `.env` file in the root directory and add these environment variables.

```env
PORT=port
MONGO_URI=your_mongodb_cluster_uri
SECRET=jwt_secret
NODE_ENV=developement
```

## Running the server

```bash
 npm run dev
```

## API Endpoints

**Authorization:** Private APIs requires a authorization token in request header
`Authorization: Bearer {token}`

### User Routes

#### Data types

```javascript
{
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["male", "female", "other"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
    },
}
```

#### 1. Register a new user

- **URL:** `/api/users/register`
- **Method:** `POST`
- **Access:** `Public`

#### 2. Login user

- **URL:** `/api/users/login`
- **Method:** `POST`
- **Access:** `Public`

#### 3. Search user

- **URL:** `/api/users/search?q=''`
- **Method:** `GET`
- **Access:** `Private`

## Packages and Dependencies

```env
        "dependencies": {
          "bcryptjs": "^3.0.0",
          "dotenv": "^16.4.7",
          "express": "^4.21.2",
          "joi": "^17.13.3",
          "jsonwebtoken": "^9.0.2",
          "mongoose": "^8.10.0"
         },
        "devDependencies": {
          "nodemon": "^3.1.9"
         }
```
