const { Router } = require('express');
const { postActivity } = require('../controllers/activities');
const router = Router();

/* POST /activities:
    Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
    Crea una actividad turística en la base de datos, relacionada con los países correspondientes */

router.post('/', postActivity)

module.exports = router