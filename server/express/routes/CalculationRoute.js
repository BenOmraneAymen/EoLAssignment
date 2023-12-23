const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const router = require('express').Router()

router.post('/', async (req, res) => {
    try{
    const bottles = req.body;
    var finalStatistics = {}
    let weightPET = 0;
    let weightGlass = 0;
    bottles.forEach(async bottle => {
        let specificBottle = await prisma.bottle.findUnique({
            where: {
                id: bottle.id
            }
        })
        if (specificBottle.type === "PET") {
            weightPET += bottle.weight * bottle.number;
        } else {
            weightGlass += bottle.weight * bottle.number;
        }
    });
    let processesPET = await prisma.process.findMany({
        where: {
            BottleType: "PET"
        }
    })
    let processesGlass = await prisma.process.findMany({
        where: {
            BottleType: "GLASS"
        }
    })
    let bottleStatisticsPET = {}
    let bottleStatisticsGlass = {}

    for (let i = 0; i < processesPET.length; i++) {
        bottleStatisticsPET.WC += processesPET[i].WC;
        bottleStatisticsPET.NRG += processesPET[i].NRG;
        bottleStatisticsPET.CO2 += processesPET[i].CO2;
    }

    for (let i = 0; i < processesGlass.length; i++) {
        bottleStatisticsGlass.WC += processesGlass[i].WC;
        bottleStatisticsGlass.NRG += processesGlass[i].NRG;
        bottleStatisticsGlass.CO2 += processesGlass[i].CO2;
    }

    finalStatistics.WC = bottleStatisticsPET.WC * weightPET + bottleStatisticsGlass.WC * weightGlass;
    finalStatistics.NRG = bottleStatisticsPET.NRG * weightPET + bottleStatisticsGlass.NRG * weightGlass;
    finalStatistics.CO2 = bottleStatisticsPET.CO2 * weightPET + bottleStatisticsGlass.CO2 * weightGlass;

    res.json(finalStatistics);
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router;
