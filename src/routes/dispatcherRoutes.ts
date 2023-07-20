import { Router } from "express";
import { PrismaClient } from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();
 

//create dispatcher
router.post('/', async (req, res) => {
    const { email, name, address, phone, image, isActive, dispatchMethod } = req.body;
    
    try {
       const result = await prisma.dispatcher.create({
            data: {
                email,
                name,
                address,
                phone,
                image,
                isActive,
                dispatchMethod,
            },
        });  
    res.json(result);
    } catch (error) {
        res.status(400).json({error: 'Your email should be unique'});
        console.log(error);
    }
});

//list dispatcher
router.get('/', async(req, res) => {
    const allUsers = await prisma.dispatcher.findMany();
    res.json(allUsers);
});

//get one dispatcher
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await prisma.dispatcher.findUnique({
        where: {
            id: Number(id),
        }, 
    });

    if (!result) {
        res.status(404).json({error: 'Dispatcher not found'});
        return;
    }
    res.json(result);     
});

//update dispatcher
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, name, address, phone, image, isActive, dispatchMethod, password } = req.body;

    try {
        const result = await prisma.dispatcher.update({
            where: {
                id: Number(id),
            },
            data: {
                email,
                name,
                address,
                phone,
                image,
                isActive,
                dispatchMethod,
            },
        });
        res.json(result);
    } catch (error) {
        res.status(400).json({error: 'Failed to update dispatcher'});
        console.log(error);
    }
});

//delete dispatcher
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.dispatcher.delete({
        where: {
            id: Number(id),
        }, 
    })
    res.sendStatus(204); 
});



export default router;