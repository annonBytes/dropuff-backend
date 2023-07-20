import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

//create a new target 
router.post('/', async (req, res) => {
    const { targetAmount, acheivedAmount, startDate, endDate, dispatcherId} = req.body;
    try {
        const newTarget = await prisma.target.create({
            data: {
                dispatcher: {
                  connect: { id: dispatcherId }
                },
                targetAmount: targetAmount,
                acheivedAmount: acheivedAmount,
                startDate: startDate,
                endDate: endDate
              },
        });
        res.status(201).json(newTarget);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});

// get all targets
router.get('/', async (req, res) => {
     try {
            const allTargets = await prisma.target.findMany({select: {id: true, targetAmount: true, acheivedAmount: true, startDate: true, endDate: true, dispatcher: true}});
            res.json(allTargets);
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
            console.log(error);
        }
});


//get a specific target
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const target = await prisma.target.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!target) {
            res.status(404).json({error: 'Target not found'});
            return;
        }
        else {
            res.json(target);
        }   
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});


// Update the details of a target
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { targetAmount, acheivedAmount, startDate, endDate, dispatcherId } = req.body;

    try {
        const result = await prisma.target.update({
            where: {
                id: Number(id),
            },
            data: {
                targetAmount,
                acheivedAmount,
                startDate,
                endDate,
                dispatcher: {
                    connect: { id: dispatcherId }
                    },
            },
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});

//delete a target
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const target = await prisma.target.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(target);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});





export default router;