import request from 'supertest';
import express from 'express';
import orderRouter from '../routes/orderRouter';

const app = express();
app.use(express.json());
app.use('/api/orders', orderRouter);

describe('Order API', () => {
    const testOrder = {
        orderNumber: 'zamowienie_nr_20241201120000123',
        date: new Date().toISOString(),
        items: [{ id: 1, name: 'Koszulka Meczowa', quantity: 1, originalPrice: 300, finalPrice: 300 }],
        originalTotal: 300,
        discountValue: 0,
        discountPercent: 0,
        finalTotal: 300,
        discountCodeApplied: null,
        memberDiscountApplied: false
    };

    test('POST /api/orders/save-order - should save order', async () => {
        const response = await request(app)
            .post('/api/orders/save-order')
            .send(testOrder);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test('POST /api/orders/save-order - should return 400 for missing order number', async () => {
        const invalidOrder = { ...testOrder, orderNumber: undefined };
        const response = await request(app)
            .post('/api/orders/save-order')
            .send(invalidOrder);
        expect(response.status).toBe(400);
    });

    test('GET /api/orders/orders - should return all orders', async () => {
        const response = await request(app).get('/api/orders/orders');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/orders/order/:orderNumber - should return 404 for non-existent order', async () => {
        const response = await request(app).get('/api/orders/order/non_existent');
        expect(response.status).toBe(404);
    });

    test('DELETE /api/orders/order/:orderNumber - should return 404 for non-existent order', async () => {
        const response = await request(app).delete('/api/orders/order/non_existent');
        expect(response.status).toBe(404);
    });
});