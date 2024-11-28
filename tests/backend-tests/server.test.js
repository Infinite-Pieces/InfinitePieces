import { expect } from "chai";
import dotenv from "dotenv";
import pkg from "pg"; // Correctly import the CommonJS module
// require('dotenv').config();

dotenv.config();

const { Pool } = pkg;

describe("Database Connection", () => {
    let pool;

    before(() => {
        // Initialize the PostgreSQL connection pool
        pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });
    });

    after(async () => {
        // Close the pool after tests are completed
        await pool.end();
    });0;

    it("should successfully connect to the database", async () => {
        try {
            const client = await pool.connect();
            expect(client).to.not.be.null;
            await client.release(); // Release the client back to the pool
        } catch (error) {
            expect.fail(`Database connection failed: ${error.message}`);
        }
    });
});
