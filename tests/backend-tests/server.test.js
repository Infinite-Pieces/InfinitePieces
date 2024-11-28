import { expect } from "chai";
import dotenv from "dotenv";
import pkg from "pg";
import request from "supertest";

dotenv.config();

const { Pool } = pkg;

const API_ADDRESS = "http://localhost:5173/api";

describe("Database Connection", () => {
    let pool;

    before(() => {
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
    });0;

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


