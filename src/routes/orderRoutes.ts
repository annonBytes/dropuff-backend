import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

//create an order with a parcel
router.post('/', async (req, res) => {
    const { type, weight, height, width, length, description, fragile, image, userId, pickupTime, startLocation, parcels } = req.body;

    try {
        //start a Prisma Transaction
        await prisma.$transaction(async (prisma) => {
            // Create the order first
            const order = await prisma.order.create({
                data: {
                    user: { connect: { id: userId } },
                    status: 'requested',
                    pickupTime,
                    startLocation,
                },
            });

        // Create parcels associated with the order
            for (const parcelData of parcels) {
                const parcel = await prisma.parcel.create({
                data: {
                    ...parcelData,
                    orderId: order.id, // Set the orderId to the id of the newly created order
                    userId,
                },
                });

            // Update the Parcel table with the attributes obtained from the request
            await prisma.parcel.update({
                where: {
                    id: parcel.id,
                },
                data: {
                    type: parcelData.type,
                    weight: parcelData.weight,
                    height: parcelData.height,
                    width: parcelData.width,
                    length: parcelData.length,
                    description: parcelData.description,
                    fragile: parcelData.fragile,
                    image: parcelData.image,
                    userId
                },
            });
        }           
            // Return the order as the response
            res.status(201).json(order);
        });
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

