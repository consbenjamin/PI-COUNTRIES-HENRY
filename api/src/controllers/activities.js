const { Activity, Country } = require('../db');
const {Op} = require('sequelize');


// const { where } = require('sequelize');

const postActivity = async (req,res) => {
    const { name, difficulty, duration, season, countriesName } = req.body;

    try {
        const activity = {
            name, 
            difficulty, 
            duration, 
            season, 
        };
        const createdActivity = await Activity.create(activity)
        const infoCountriesName = await Country.findAll({
            where:{ 
                name:{
                [Op.in]:countriesName
            }  
        }});
        infoCountriesName?.map(el => el.addActivity(createdActivity))
        if(createdActivity)res.json({message: "Se creo correctamente la Actividad", data: createdActivity})
        else res.json({message: "Error, no se obtuvieron suficientes datos"})
    } catch (error) {
        'Something went Wrong'
    }
};

module.exports = { postActivity }

// const postActivity = async (req, res) => {
//     const { name, difficulty, duration, season, countriesName } = req.body;
//     if (!name || !difficulty | !duration || !season || !countriesName) return res.status(404).send("Missing parameters")

//     try {
//         const newActivity = await Activity.create({ name, difficulty, duration, season, countriesName });

//         const findCountry = await Country.findAll({
//             where: { name: countriesName }
//         })

//         await newActivity.addCountries(findCountry)

//         return res.status(200).send(newActivity)


//     } catch (error) {
//         console.log(error)
//         return res.status(400).send(error)
//     }

// };

// module.exports = { postActivity }
