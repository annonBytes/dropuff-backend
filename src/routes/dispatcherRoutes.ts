import { Router } from "express";

const router = Router();

//create dispatcher
router.post('/', (req, res) => {
    res.status(501).json({error: 'Not implemented'});
});

//list dispatcher
router.get('/', (req, res) => {
    res.status(501).json({error: 'Not implemented'});
});

//get one dispatcher
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({error: 'Not implemented ${id}'});
});

//update dispatcher
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({error: 'Not implemented ${id}'});
});

//delete dispatcher
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({error: 'Not implemented ${id}'});
});


export default router;