import bcrypt from "bcryptjs";
import { expect } from "chai";
import dotenv from "dotenv";
import pkg from "pg";
import request from "supertest";

dotenv.config();

const { Pool } = pkg;
const API_ADDRESS = "http://localhost:5173/api";

let pool;

before(async () => {
    pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    });
});

after(async () => {
    await pool.end();
});

describe("Database Connection", () => {
    it("should successfully connect to the database", async () => {
        try {
            const client = await pool.connect();
            expect(client).to.not.be.null;
            await client.release();
        } catch (error) {
            expect.fail(`Database connection failed: ${error.message}`);
        }
    });
});

describe("GET /", () => {
    it("should return a success message", async () => {
        const res = await request(API_ADDRESS).get("/");
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("Backend test message: Hi from Infinite Pieces backend!");
    });
});

describe("POST /auth/signup", () => {
    before(async () => {
        await pool.query("DELETE FROM Users WHERE email = 'testuser@example.com'");
    });

    after(async () => {
        await pool.query("DELETE FROM Users WHERE email = 'testuser@example.com'");
    });

    it("should create a new user successfully", async () => {
        const newUser = {
            email: "testuser@example.com",
            password: "password123",
            firstName: "Test",
            lastName: "User",
        };

        const res = await request(API_ADDRESS).post("/auth/signup").send(newUser);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("message", "User created successfully");
        expect(res.body).to.have.property("user_id");
    });

    it("should return an error if the email is already registered", async () => {
        const duplicateUser = {
            email: "testuser@example.com",
            password: "password123",
            firstName: "Test",
            lastName: "User",
        };

        const res = await request(API_ADDRESS).post("/auth/signup").send(duplicateUser);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("error", "Email is already registered");
    });
});

describe("POST auth/login", () => {
    before(async () => {
        await pool.query(`
            INSERT INTO Users (email, password_hash, firstName, lastName)
            VALUES ('testuser@example.com', $1, 'Test', 'User')
        `, [await bcrypt.hash("password123", 10)]);
    });

    after(async () => {
        await pool.query("DELETE FROM Users WHERE email = 'testuser@example.com'");
    });

    it("should log in the user with valid credentials", async () => {
        const credentials = {
            email: "testuser@example.com",
            password: "password123",
        };

        const res = await request(API_ADDRESS).post("/auth/login").send(credentials);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "Login successful");
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("email", "testuser@example.com");
    });

    it("should return an error for invalid credentials", async () => {
        const invalidCredentials = {
            email: "testuser@example.com",
            password: "wrongpassword",
        };

        const res = await request(API_ADDRESS).post("/auth/login").send(invalidCredentials);
        expect(res.status).to.equal(401);
    });

    it("should return an error for a non-existent user", async () => {
        const nonExistentUser = {
            email: "nonexistent@example.com",
            password: "password123",
        };

        const res = await request(API_ADDRESS).post("/auth/login").send(nonExistentUser);
        expect(res.status).to.equal(401);
    });
});

describe("GET /auth/user", () => {
    let agent;

    before(async () => {
        agent = request.agent(API_ADDRESS);

        await pool.query(`
            INSERT INTO Users (email, password_hash, firstName, lastName)
            VALUES ('testuser@example.com', $1, 'Test', 'User')
        `, [await bcrypt.hash("password123", 10)]);

        await agent.post("/auth/login").send({
            email: "testuser@example.com",
            password: "password123",
        });
    });

    after(async () => {
        await pool.query("DELETE FROM Users WHERE email = 'testuser@example.com'");
    });

    it("should return user details when authenticated", async () => {
        const res = await agent.get("/auth/user");
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("email", "testuser@example.com");
    });

    it("should return 401 when not authenticated", async () => {
        const res = await request(API_ADDRESS).get("/auth/user");
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property("error", "Unauthorized");
    });
});

describe("POST /auth/logout", () => {
    let agent;

    before(async () => {
        agent = request.agent(API_ADDRESS);

        await pool.query(`
            INSERT INTO Users (email, password_hash, firstName, lastName)
            VALUES ('testuser@example.com', $1, 'Test', 'User')
        `, [await bcrypt.hash("password123", 10)]);

        await agent.post("/auth/login").send({
            email: "testuser@example.com",
            password: "password123",
        });
    });

    after(async () => {
        await pool.query("DELETE FROM Users WHERE email = 'testuser@example.com'");
    });

    it("should log out the user successfully", async () => {
        const res = await agent.post("/auth/logout");
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "Logout successful");

        const userRes = await agent.get("/auth/user");
        expect(userRes.status).to.equal(401);
        expect(userRes.body).to.have.property("error", "Unauthorized");
    });

    it("should handle logout when not logged in", async () => {
        const res = await request(API_ADDRESS).post("/auth/logout");
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "Logout successful");
    });
});
