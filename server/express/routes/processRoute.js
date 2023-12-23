const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const router = require('express').Router()

router.get('/:type', async (req, res) => {
    try {

        const processes = await prisma.process.findMany({
            where: {
                BottleType: req.params.type
            }
        })
        res.json(processes)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {

        const process = await prisma.process.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(process)
    } catch (er) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {

        console.log(req.body)

        const processes = await prisma.process.findMany({})

        processes.forEach(async (process) => {
            if (process.position >= req.body.position) {
                await prisma.process.update({
                    where: {
                        id: process.id
                    },
                    data: {
                        position: process.position + 1
                    }
                })
            }   
        })

        const process = await prisma.process.create({
            data: {
                name: req.body.name,
                position: req.body.position,
                WC: req.body.WC,
                NRG: req.body.NRG,
                CO2: req.body.CO2,
                BottleType: req.body.BottleType,
            }
        })
        res.json(process)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

router.put('/:id', async (req, res) => {
    try {

        const process = await prisma.process.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                position: req.body.position,
                WC: req.body.WC,
                NRG: req.body.NRG,
                CO2: req.body.CO2,
                BottleType: req.body.BottleType,
            }
        })
        res.json(process)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)

router.delete('/:id', async (req, res) => {
    try {

        const process = await prisma.process.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        res.json(process)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)


router.post('/calc', async (req, res) => {
    try {
        // const bottles = req.body;
        // var finalStatistics = {}
        // var weightPET = 0;
        // var weightGlass = 0;
        // await bottles.forEach(async bottle => {
        //     let specificBottle = prisma.bottle.findUnique({
        //         where: {
        //             id: bottle.id
        //         }
        //     })
        //     console.log("id ", bottle.id, "number", bottle.number)
        //     if (bottle.number) {
        //         if (specificBottle.type === "PET") {
        //             weightPET += bottle.weight * bottle.number;
        //         } else {
        //             weightGlass += bottle.weight * bottle.number;
        //         }
        //     }
        // })

        // let processesPET = await prisma.process.findMany({
        //     where: {
        //         BottleType: "PET"
        //     }
        // })
        // let processesGlass = await prisma.process.findMany({
        //     where: {
        //         BottleType: "GLASS"
        //     }
        // })
        // var bottleStatisticsPET = { WC: 0, NRG: 0, CO2: 0 }
        // var bottleStatisticsGlass = { WC: 0, NRG: 0, CO2: 0 }

        // processesPET.forEach((process) => {
        //     bottleStatisticsPET.WC += process.WC;
        //     bottleStatisticsPET.NRG += process.NRG; 
        //     bottleStatisticsPET.CO2 += process.CO2;
        // })
        // processesGlass.forEach((process) => {
        //     bottleStatisticsPET.WC += process.WC;
        //     bottleStatisticsPET.NRG += process.NRG;
        //     bottleStatisticsPET.CO2 += process.CO2;
        // })

        // finalStatistics.WC = bottleStatisticsPET.WC * weightPET / 1000000 + bottleStatisticsGlass.WC * weightGlass / 1000000;
        // finalStatistics.NRG = bottleStatisticsPET.NRG * weightPET / 1000000 + bottleStatisticsGlass.NRG * weightGlass / 1000000;
        // finalStatistics.CO2 = bottleStatisticsPET.CO2 * weightPET / 1000000 + bottleStatisticsGlass.CO2 * weightGlass / 1000000;

        // res.json(finalStatistics);
        const bottles = req.body;
        var finalStatistics = {};
        var weightPET = 0;
        var weightGlass = 0;

        // Use map to create an array of promises
        const bottlePromises = bottles.map(bottle => {
            return prisma.bottle.findUnique({
                where: {
                    id: bottle.id
                }
            }).then(specificBottle => {
                console.log("id ", bottle.id, "number", bottle.number);
                if (bottle.number) {
                    if (specificBottle.type === "PET") {
                        weightPET += bottle.weight * bottle.number;
                    } else {
                        weightGlass += bottle.weight * bottle.number;
                    }
                }
            });
        });

        // Use Promise.all to wait for all bottle promises to resolve
        Promise.all(bottlePromises).then(() => {
            return Promise.all([
                prisma.process.findMany({
                    where: {
                        BottleType: "PET"
                    }
                }),
                prisma.process.findMany({
                    where: {
                        BottleType: "GLASS"
                    }
                })
            ]);
        }).then(([processesPET, processesGlass]) => {
            var bottleStatisticsPET = { WC: 0, NRG: 0, CO2: 0 };
            var bottleStatisticsGlass = { WC: 0, NRG: 0, CO2: 0 };

            processesPET.forEach(process => {
                bottleStatisticsPET.WC += process.WC;
                bottleStatisticsPET.NRG += process.NRG;
                bottleStatisticsPET.CO2 += process.CO2;
            });

            processesGlass.forEach(process => {
                bottleStatisticsGlass.WC += process.WC;
                bottleStatisticsGlass.NRG += process.NRG;
                bottleStatisticsGlass.CO2 += process.CO2;
            });

            finalStatistics.WC = bottleStatisticsPET.WC * weightPET / 1000000 + bottleStatisticsGlass.WC * weightGlass / 1000000;
            finalStatistics.NRG = bottleStatisticsPET.NRG * weightPET / 1000000 + bottleStatisticsGlass.NRG * weightGlass / 1000000;
            finalStatistics.CO2 = bottleStatisticsPET.CO2 * weightPET / 1000000 + bottleStatisticsGlass.CO2 * weightGlass / 1000000;

            res.json(finalStatistics);
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router;