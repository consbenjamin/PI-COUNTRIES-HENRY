const { Country, Activity } = require('../db');
const axios = require('axios');
// const { where } = require('sequelize');

const getCountries = async (req, res) => {
    const { name } = req.query;
    if(!name) {
        let BD = await Country.findAll({
            attributes: ["id", "name", "flag", "continent", "population"],
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: []
                }
            }
        })
        if(BD.length > 0) {
            return res.status(200).send(BD);
        } else {
            const allCountries = await axios.get("https://restcountries.com/v3/all");
            const pais = allCountries.data.map((p) => {
                return {
                    id: p.cca3,
                    name: p.name.common,
                    flag: p.flags[0],
                    continent: p.continents[0],
                    capital: p.capital != null ? p.capital[0] : "No data",
                    subregion: p.subregion,
                    area: p.area,
                    population: p.population,
                };
            });
            await Country.bulkCreate(pais, {validate: true})
            let BD = await Country.findAll({
                attributes: ["id", "name", "flag", "continent", "population"],
                include:{
                    model: Activity,
                    attributes: ["name", "difficulty", "duration", "season"],
                    through: {
                        attributes: []
                    }
                }
            })
            return res.status(200).send(BD);
        }
    }
    let allCountries = await Country.findAll({include:Activity});
    let countriesName = allCountries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
    return countriesName.length ?
    res.status(200).send(countriesName) :
    res.status(404).send('No existe ese Pais');
};

    const getCountryById = async (req, res) => {
        const { id } = req.params;
        let allCountries = await Country.findAll({include: {
            model: Activity,
            attributes:["name", "difficulty", "duration", "season"],
            through: {
                attributes: []
            }
        }});
        let countriesId = allCountries.filter( el => el.id.toLowerCase().includes(id.toLowerCase()))
        return countriesId.length ?
        res.status(200).send(countriesId) :
        res.status(404).send('No se recibio un id correcto');
    };
    module.exports={
        getCountries,
        getCountryById
    };







//Info de la Api

// const getApiCountries = async () => {
//     const apiUrl = await axios.get('https://restcountries.com/v3/all');
//     const apiInfo = await apiUrl.data.map(el => {
//         return {
//             id: el.cca3,
//             name: el.name.common,
//             flag: el.flags[0],
//             continent: el.continents[0],
//             capital: el.capital != null ? el.capital[0] : "No data",
//             subregion: el.subregion,
//             area: el.area,
//             population: el.population,
//         };
//     });
//     return apiInfo
// }

// //Info de la DB, hago un findAll para tener todos los countries y les incluyo el modelo de la activity.

// const getDbCountries = async () => {
//     const DbInfo = await Country.findAll({
//         attribute: ['id', 'name', 'flag', 'continent', 'population'],
//         include: {
//             model: Activity,
//             attributes: ['name', 'difficulty', 'duration', 'season'],
//             through: {
//                 attributes: [],
//             }
//         }
//     })
//     return DbInfo;
// }

// //Concateno la info de la API y de la DB.

// const getAllCountries = async () => {
//     const apiInfo = await getApiCountries();
//     const dbInfo = await getDbCountries();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal;
// }

// //////////////////////////////////////////////////////////////////////////////////

// const getCountries = async (req, res) => {
//     const name = req.query.name
//     let countriesTotal = await getAllCountries();
//     try {
//         if (name) {
//             let countryName = await countriesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
//             countryName.length ? res.status(200).send(countryName) : res.status(404).send('No se encontró una pais que concuerde con tu busqueda.');
//         } else res.status(200).send(countriesTotal);
//     } catch (error) {
//         res.status(404).send('Something went wrong')
//     }
// };



// const getCountryById = async (req,res) => {
//     const id = req.params.idPais;
//     const allCountries = await getCountries()
//     const countryId = await allCountries.filter( el => el.id.toLowerCase().includes(id.toLowerCase()));
//     countryId.length ? res.status(200).send(countryId) : res.status(404).send('No se encontró una pais que concuerde con tu ID.');
// };



// module.exports = {  getCountries, getCountryById }

//getApiCountries, getDbCountries, getAllCountries,




// const restCountries = "https://restcountries.com/v3/all";

// //Controllers

// const getCountries = async (req, res) => {
//     const { name } = req.query;
//     try {
//         const countries = await Country.findAll({
//             include: [{
//                 model: Activity,
//                 attributes: ["name", "difficulty", "duration", "season"],
//                 through: { attributes: [] }
//             }]
//         })

//         if (!name && !countries.length) {
//             const url = await axios.get(restCountries);
//             const resp = url.data;
//             try {
//                 let results = resp.map(c => {
//                     return {
//                         name: c.name.common ? c.name.common : c.name.official,
//                         id: c.cca3 ? c.cca3 : c.cioc,
//                         flag: c.flags[0] ? c.flags[0] : c.flags[1],
//                         continent: c.continents ? c.continents[0] : "no continent registered",
//                         capital: c.capital ? c.capital[0] : "no capital registered",
//                         subregion: c.subregion ? c.subregion : "no subregion registered",
//                         area: c.area ? c.area : 0,
//                         population: c.population ? c.population : 0,
//                     }
//                 })

//                 const response = await Country.bulkCreate(results);
//                 return res.status(200).send(response)

//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         if (name && countries.length) {
//             try {
//                 const country = await Country.findAll({
//                     where: {
//                         name: { [substring]: name }
//                     },
//                     include: [{
//                         model: Activity,
//                         attributes: ["name", "difficulty", "duration", "season"],
//                         through: { attributes: [] }
//                     }]
//                 })
//                 country.length ? res.status(200).send(country) :
//                     res.status(400).send("No country matches that name")
//             }
//             catch (error) {
//                 return res.status(400).send("No country matches that name")
//             }
//         } if (!name && countries.length) {
//             res.status(200).send(countries)
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }



// const getCountryById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const country = await Country.findByPk(id,
//             {
//                 include: [{
//                     model: Activity,
//                     attributes: ["name", "difficulty", "duration", "season"],
//                     through: { attributes: [] }
//                 }]
//             })
//         return res.status(200).send(country)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// }

// router.get("/activity", async (req, res) => {
//     try {
//         const activities = await Activity.findAll({
//             include: [{
//                 model: Country,
//                 attributes: ["name"],
//                 through: { attributes: [] }
//             }]
//         })
//         return res.status(200).send(activities)

//     } catch (error) {
//         return res.status(400).send("No activities stored")
//     }
// })

// module.exports = {  getCountries, getCountryById }