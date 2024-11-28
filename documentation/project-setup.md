# Infinite Pieces - Setup Instructions
This README provides step-by-step instructions to set up and run the Infinite Pieces project on your local machine.

## Prerequisites
Before you begin, ensure you have the following installed:
- Docker Desktop
- VS CODE (Highly Recommended)

## Installation
1. Clone the repository:
2. Navigate to the project app directory:
   ```bash
   cd app
   ```

## Running the Application
To run the project run the following command:
```bash
docker compose up --build
```

## Accessing Routes
After starting the server, you can access the following routes in your browser:
- Frontend: `http://localhost:5173`
- Database Management System: `http://localhost:8080`

## Linter
#### Frontend:
- To check for errors run:
```
cd app/frontend
npm run lint-check
```
- To fix errors run:
```
cd app/frontend
npm run lint
```
#### Backend
- To check for errors run:
```
cd app/backend
npm run lint-check
```
- To fix errors run:
```
cd app/backend
npm run lint
```
#### Admin Backend
- To check for errors run:
```
cd app/admin-backend
npm run lint-check
```
- To fix errors run:
```
cd app/admin-backend
npm run lint
```
#### Tests
- To check for errors run:
```
cd tests
npm run lint-check
```
- To fix errors run:
```
cd tests
npm run lint
```