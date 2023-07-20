import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

//create an order with a parcel
router.post('/parcel', async (req, res) => {
    const { type, weight, height, width, length, description, fragile, price, image, dispatcherId, status, userId, pickupTime, startLocation, } = req.body;

    try {
        const result = await prisma.order.create({
            data: {
                parcels: {
                    create: {
                        type,
                        weight,
                        height,
                        width,
                        length,
                        description,
                        fragile,
                        image,
                    },
                },
                dispatcher: { connect: { id: dispatcherId } },
                user: { connect: { id: userId } },
                status: 'requested',
                pickupTime,
                startLocation,
            },
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});


//get all orders
router.get('/', async (req, res) => {
    try {
        const result = await prisma.order.findMany({
            include: {
                parcels: true,
                dispatcher: true,
                user: true,
            },
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});


//get a specific order
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prisma.order.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                parcels: true,
                dispatcher: true,
                user: true,
            },
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});


//update an order
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await prisma.order.update({
            where: {
                id: Number(id),
            },
            data: {
                status,
            },
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});


//delete an order
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prisma.order.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});

export default router;

