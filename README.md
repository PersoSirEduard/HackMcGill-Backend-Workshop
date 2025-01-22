# HackMcGill-Backend-Workshop

## Description
This project serves as a learning tool to grasp the fundamentals of constructing a RESTful API within an MVC architecture. In this demonstration, we've crafted a lightweight Twitter-inspired platform where users can register, log in, and post updates.

## Requirements
- Docker version >= 26.0.0
- NPM version >= 10.5.0
- Node.js >= 20.12.0

## Usage
### Option 1
Run the Docker compose file to automatically build and serve the application.
```bash
docker compose up --build
```

### Option 2

1. Build the React front-end application. Make sure that you first install all the necessary packages.
```bash
cd frontend
npm install
npm run build
```
_You should now have generated a `public` folder with your compiled frontend code._

2. Download and run the official MongoDB Docker container for the back-end database.
```bash
docker pull mongo
docker run -d -p 27017:27017 --name mongo-server -d mongo:latest
```

3. Start the Node.js back-end application. Once more, make sure to install all the necessary packages first.
```bash
cd backend
npm install
npm start
```