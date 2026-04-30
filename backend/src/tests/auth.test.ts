import request from 'supertest';
import express from 'express';
import authRouter from '../routes/authRouter.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe("Auth API", () => {
    const testUser = {
        imie: "Test",
        nazwisko: "Testowy",
        email: `test${Date.now()}@test.pl`,
        haslo: "test123"
    };

    let authToken = "";

    test("POST /api/auth/register - should create user", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
        expect(response.body.user.email).toBe(testUser.email);
        expect(response.body.user.imie).toBe(testUser.imie);
    });

    test("POST /api/auth/register - should reject duplicate email", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    test("POST /api/auth/register - should reject missing fields", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ imie: "Test" });

        expect(response.status).toBe(400);
    });

    test("POST /api/auth/login - should login user", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: testUser.email, haslo: testUser.haslo });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
        expect(response.body.user.email).toBe(testUser.email);

        authToken = response.body.token;
    });

    test("POST /api/auth/login - should reject wrong password", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: testUser.email, haslo: "wrong" });

        expect(response.status).toBe(401);
    });

    test("POST /api/auth/login - should reject missing fields", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: testUser.email });

        expect(response.status).toBe(400);
    });

    test("GET /api/auth/me - should return user data", async () => {
        const response = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body.user.email).toBe(testUser.email);
    });

    test("GET /api/auth/me - should reject without token", async () => {
        const response = await request(app).get('/api/auth/me');

        expect(response.status).toBe(401);
    });

    test("GET /api/auth/me - should reject invalid token", async () => {
        const response = await request(app)
            .get('/api/auth/me')
            .set('Authorization', 'Bearer invalid');

        expect(response.status).toBe(401);
    });
});