# 🔧 Environment Setup

## 1. Copy Environment Files
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual values
```

## 2. Install Dependencies
```bash
# Install all dependencies
npm run install-all

# OR install manually:
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

## 3. Start Development
```bash
# Start both client and server
npm run dev

# OR start separately:
npm run server  # Terminal 1
npm run client # Terminal 2
```

## 4. Run Tests
```bash
npm test           # All tests
npm run test:e2e   # E2E tests (requires app running)
```

## 5. API Documentation
Once the server is running, visit:
- **Swagger UI**: http://localhost:5000/api-docs
- Interactive API testing and documentation