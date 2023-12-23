const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const router = require('express').Router()


router.get('/', async (req, res) => {
    try {

        const users = await prisma.admin.findMany();
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {

        const user = await prisma.admin.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

router.post('/', async (req, res) => {
    try {

        const password = await bcrypt.hash(req.body.password, saltRounds);
        console.log(req.body)
        const user = await prisma.admin.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: password,
            }
        })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const user = await prisma.admin.findUnique({
            where: {
                email: req.body.email,
            }
        })
        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                let token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
                console.log("token ", token)
                console.log({ ...user, token: token })
                return res.json({ ...user, token: token })
            } else {
                return res.status(400).json({ error: 'Wrong password' })
            }
        }
        return res.status(400).json({ error: 'User not found' })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

router.put('/:id', async (req, res) => {
    try {

        const password = await bcrypt.hash(req.body.password, saltRounds);
        const user = await prisma.admin.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: password,
            }
        })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

router.delete('/:id', async (req, res) => {
    try {

        const user = await prisma.admin.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

module.exports = router;