const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../app/backend/server');
const { Pool } = require('pg');
const { expect } = chai;

chai.use(chaiHttp);

const request = supertest(app);

describe('Backend API Tests', () => {
  // Mock database pool
  const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  before(async () => {
    // Set up test database (clear and add test data)
    await pool.query('TRUNCATE Users, User_Sessions RESTART IDENTITY CASCADE');
  });

  after(async () => {
    // Clean up test database
    await pool.end();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user', async () => {
      const res = await request.post('/api/auth/signup').send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message', 'User created successfully');
      expect(res.body).to.have.property('user_id');
    });

    it('should return an error if the email is already registered', async () => {
      const res = await request.post('/api/auth/signup').send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Email is already registered');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in the user', async () => {
      const res = await request.post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Login successful');
      expect(res.body).to.have.property('user');
    });

    it('should return an error for invalid credentials', async () => {
      const res = await request.post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('error', 'Unauthorized');
    });
  });

  describe('GET /api/auth/user', () => {
    let agent;

    beforeEach(() => {
      // Use a persistent agent to maintain session cookies
      agent = supertest.agent(app);
    });

    it('should return the user details for an authenticated user', async () => {
      // Log in the user
      await agent.post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await agent.get('/api/auth/user');

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('email', 'test@example.com');
      expect(res.body).to.have.property('user_id');
    });

    it('should return an error for an unauthenticated user', async () => {
      const res = await request.get('/api/auth/user');

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('error', 'Unauthorized');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should log out the user', async () => {
      const agent = supertest.agent(app);

      // Log in the user
      await agent.post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await agent.post('/api/auth/logout');

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Logout successful');
    });
  });
});
