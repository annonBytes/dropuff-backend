import e, { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

//create a new rating 
router.post('/', async (req, res) => {
    const { ratingValue, reviewMessage, userId, order  } = req.body;
    try {
        const newRating = await prisma.rating.create({
            data: {
                ratingValue,
                reviewMessage,
                order: {connect : {id: order}},
                user: {connect : {id: userId}},
            }
        });
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});

// get all ratings
router.get('/', async (req, res) => {
    try {
        const allRatings = await prisma.rating.findMany({select: {id: true, ratingValue: true, reviewMessage: true, order: true, user: true}});
        res.json(allRatings);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});

//get a specific rating
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const rating = await prisma.rating.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!rating) {
            res.status(404).json({error: 'Rating not found'});
            return;
        }
        else {
            res.json(rating);
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});



//update a rating
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ratingValue, reviewMessage } = req.body;

    try {
        const result = await prisma.rating.update({
            where: {
                id: Number(id),
            },
            data: {
                ratingValue,
                reviewMessage,
            },
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }

});


//delete a rating
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prisma.rating.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({message: 'Rating deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
        console.log(error);
    }
});



export default router