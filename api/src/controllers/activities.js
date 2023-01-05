const { Activity, Country } = require('../db');
const {Op} = require('sequelize');

const postActivity = async (req,res,) => {
    const { name, difficulty, duration, season, countriesName } = req.body;

    try {
        if(name&&difficulty&&duration&&season&&countriesName){
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
        }
    } catch (error) {
        'Something went Wrong'
    }
};

module.exports = { postActivity }









// , include:[{
//     model: Activity
// }]  
// });
// console.log(infoCountriesName.activities)
// for (let i = 0; i < infoCountriesName.length; i++) {
//     if (infoCountriesName[i].activities.length > 1)
//     console.log(infoCountriesName[i])
// }
