import { Router } from "express";
import prisma from "../prismaDb.js";

const shopDbRouter = Router();

shopDbRouter.get("/products", async (req, res) => {
    try {
        const products = await prisma.produkt.findMany({
            orderBy: { id: 'asc' }
        });
        res.json(products);
    } catch (error) {
        console.error('Błąd pobierania produktów:', error);
        res.status(500).json({ error: "Błąd pobierania produktów" });
    }
});

shopDbRouter.get("/products/category/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const products = await prisma.produkt.findMany({
            where: { kategoria: category }
        });
        res.json(products);
    } catch (error) {
        console.error('Błąd pobierania produktów:', error);
        res.status(500).json({ error: "Błąd pobierania produktów" });
    }
});

shopDbRouter.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.produkt.findUnique({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({ error: "Produkt nie znaleziony" });
        }

        res.json(product);
    } catch (error) {
        console.error('Błąd pobierania produktu:', error);
        res.status(500).json({ error: "Błąd pobierania produktu" });
    }
});

export default shopDbRouter;