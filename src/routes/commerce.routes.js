const express = require('express');

const router = express.Router();

/**
 * Simula delay (latencia de red)
 * @param {number} ms
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * POST /api/commerce/enroll
 * Body esperado:
 * {
 *   "commerce": {
 *     "tid": "ABC12345",
 *     "ruc": "0999999999001",
 *     "code": "100"
 *   }
 * }
 */
router.post('/enroll', async (req, res) => {
    try {
        const { tid, ruc, code } = req.body;


        // Simular delay (2 segundos)
        await sleep(2000);



        console.log('📦 Commerce recibido:', tid, ruc, code);

        return res.status(200).json({
            message: 'Commerce enrolado correctamente',
            commerce: {
                tid,
                ruc,
                code

            }
        });

    } catch (error) {
        console.error('❌ Error en /enroll:', error);

        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

module.exports = router;