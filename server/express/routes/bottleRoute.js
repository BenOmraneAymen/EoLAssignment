const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const router = require('express').Router()


router.get('/:type', async (req, res) => {
    try {
        if(req.params.type === "All"){
            const bottles = await prisma.bottle.findMany()
            return res.json(bottles)
        }
        const bottles = await prisma.bottle.findMany({
            where: {
                type: req.params.type
            }
        })
        res.json(bottles)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const bottle = await prisma.bottle.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(bottle)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

router.post('/', async (req, res) => {
    try {

        console.log(req.body)
        const bottle = await prisma.bottle.create({
            data: {
                name: req.body.name,
                weight: req.body.weight,
                type: req.body.type,
                cycles: req.body.cycles,
                capacity: req.body.capacity,
            }
        })
        res.json(bottle)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

router.put('/:id', async (req, res) => {
    try {

        const bottle = await prisma.bottle.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                weight: req.body.weight,
                type: req.body.type,
                cycles: req.body.cycles,
                capacity: req.body.capacity,
            }
        })
        res.json(bottle)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

router.delete('/:id', async (req, res) => {
    try {

        const bottle = await prisma.bottle.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(bottle)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)
module.exports = router;

