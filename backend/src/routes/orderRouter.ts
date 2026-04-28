import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const orderRouter = Router();
orderRouter.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ordersDir = path.join(__dirname, '../../Orders');

if (!fs.existsSync(ordersDir)) {
    fs.mkdirSync(ordersDir, { recursive: true });
}

interface OrderItem {
    id: number;
    name: string;
    size: string | null;
    playerName: string | null;
    quantity: number;
    originalPrice: number;
    finalPrice: number;
}

interface OrderData {
    orderNumber: string;
    date: string;
    items: OrderItem[];
    originalTotal: number;
    discountValue: number;
    discountPercent: number;
    finalTotal: number;
    discountCodesApplied: string[] | null;
    memberDiscountApplied: boolean;
}

orderRouter.post('/save-order', (req: Request, res: Response) => {
    try {
        const orderData: OrderData = req.body;

        if (!orderData.orderNumber) {
            return res.status(400).json({ error: 'Brak numeru zamówienia' });
        }

        const fileName = `${orderData.orderNumber}.json`;
        const filePath = path.join(ordersDir, fileName);

        fs.writeFileSync(filePath, JSON.stringify(orderData, null, 2), 'utf8');

        res.status(200).json({
            success: true,
            message: 'Zamówienie zostało zapisane',
            filePath: filePath
        });
    } catch (error) {
        console.error('Błąd zapisu zamówienia:', error);
        res.status(500).json({ error: 'Błąd podczas zapisywania zamówienia' });
    }
});

orderRouter.get('/orders', (req: Request, res: Response) => {
    try {
        const files = fs.readdirSync(ordersDir);
        const orders = files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const filePath = path.join(ordersDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(content);
            });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Błąd odczytu zamówień:', error);
        res.status(500).json({ error: 'Błąd podczas odczytywania zamówień' });
    }
});

orderRouter.get('/order/:orderNumber', (req: Request, res: Response) => {
    try {
        const { orderNumber } = req.params;
        const fileName = `${orderNumber}.json`;
        const filePath = path.join(ordersDir, fileName);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Nie znaleziono zamówienia' });
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const order = JSON.parse(content);

        res.status(200).json(order);
    } catch (error) {
        console.error('Błąd odczytu zamówienia:', error);
        res.status(500).json({ error: 'Błąd podczas odczytywania zamówienia' });
    }
});

orderRouter.delete('/order/:orderNumber', (req: Request, res: Response) => {
    try {
        const { orderNumber } = req.params;
        const fileName = `${orderNumber}.json`;
        const filePath = path.join(ordersDir, fileName);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Nie znaleziono zamówienia' });
        }

        fs.unlinkSync(filePath);

        res.status(200).json({ success: true, message: 'Zamówienie zostało usunięte' });
    } catch (error) {
        console.error('Błąd usuwania zamówienia:', error);
        res.status(500).json({ error: 'Błąd podczas usuwania zamówienia' });
    }
});

export default orderRouter;