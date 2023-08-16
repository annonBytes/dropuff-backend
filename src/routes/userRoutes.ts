import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();


 //create user
 router.post('/', async (req, res) => {
    const { email, name, address, phone, image, paymentMethod } = req.body;
    //console.log(email, name, address, phone, image, paymentMethod, password);

try {
      const result = await prisma.user.create({
            data: {
                email,
                name,
                address,
                phone,
                image,
            },  
        });
        res.json(result);
    } catch (error) {
        res.status(400).json({error: 'Your email should be unique'});
        console.log(error);
    }
}
);

//get user
router.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany({ select: {id: true, name: true, email: true, address: true, phone: true, image: true,}});    
    // const allMyUsers = await prisma.user.findMany({include: {parcel: true}}); *this includes a portion to the json response*
    res.json(allUsers);
});

//get one user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(user);
    //res.status(501).json({error: 'Not implemented ${id}'});
});

//update user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, name, address, phone, image, } = req.body;

    try {
        const result = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                email,
                name,
                address,
                phone,
                image,
            },  
        });
        res.json(result);
    }  catch (error) {
        res.status(400).json({error: 'Failed to update the user'});
        console.log(error);
    } 
});

//delete user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.user.delete({
        where: {    
            id: Number(id),
        },
    })
    res.sendStatus(204);
});


export default router;