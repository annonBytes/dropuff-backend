import { Router } from 'express';
import { PrismaClient } from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();


//create parcel
router.post('/', async (req, res) => {
    const { type, weight, height, width, length, description, fragile, image, orderId, } = req.body;

    try {
        const result = await prisma.parcel.create({
            data: {
                type,
                weight,
                height,
                width,
                length,
                description,
                fragile,
                image,
                order: { connect: { id: orderId } },
            },
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});

//Get all parcels
router.get('/', async (req, res) => {
  
    try {
        const result = await prisma.parcel.findMany({
            include: {
                order: true,
            },
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});

//Get a specific parcel
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await prisma.parcel.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                order: true,
            },
        });

        if (!result) {
            res.status(404).json({error: 'Parcel not found'});
            return;
        }
        else {
            res.json(result);
        }        
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});

//Update a parcel
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { type, weight, height, width, length, description, fragile, image, orderId, userId, } = req.body;

    try {
        const result = await prisma.parcel.update({
            where: {
                id: Number(id),
            },
            data: {
                type,
                weight,
                height,
                width,
                length,
                description,
                fragile,
                image,
                order: { connect: { id: orderId } },
            },
            include: {
                order: true,
            },
        });
     
        res.json(result);

    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});

//Delete a parcel
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prisma.parcel.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({message: 'Parcel deleted successfully'});
    }
    catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});


export default router;