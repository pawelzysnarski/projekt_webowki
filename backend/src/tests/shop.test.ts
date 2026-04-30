import request from 'supertest';
import express from 'express';
import shopDbRouter from '../routes/shopDbRouter';

const app = express();
app.use(express.json());
app.use('/api/shop', shopDbRouter);

describe('Shop API', () => {
    test('GET /api/shop - should return all products', async () => {
        const response = await request(app).get('/api/shop');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/shop/:id - should return product by id', async () => {
        const response = await request(app).get('/api/shop/1');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.id).toBe(1);
    });

    test('GET /api/shop/:id - should return 404 for non-existent product', async () => {
        const response = await request(app).get('/api/shop/99999');
        expect(response.status).toBe(404);
    });
});