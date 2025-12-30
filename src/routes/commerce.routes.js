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

const AssociationStatus = Object.freeze({
    ASOCIACION_CORRECTA: 'Asociación Correcta',
    ASOCIACION_INCORRECTA: 'Asociación Incorrecta'
});
router.post('/enroll', async (req, res) => {
    try {
        const { tid, ruc, code } = req.body;

        // Simular delay (2 segundos)
        await sleep(2000);


        //CASE TWO
        if (tid === '88888888') {
            return res.status(400).json({
                message: AssociationStatus.ASOCIACION_INCORRECTA,
                description: 'POS no asociado'
            });
        }

        //CASE THREE
        if (code === '300') {
            return res.status(400).json({
                message: AssociationStatus.ASOCIACION_INCORRECTA,
                description: 'Comercio bloqueado'
            });
        }

        //CASE FOUR
        if (code === '400') {
            return res.status(400).json({
                message: AssociationStatus.ASOCIACION_INCORRECTA,
                description: 'Comercio Inactivo'
            });
        }



        //CASE FIVE
        if (ruc === '1899060366001') {
            return res.status(400).json({
                message: AssociationStatus.ASOCIACION_INCORRECTA,
                description: 'RUC no existente'
            });
        }


        //CASE SIX
        if (code === '600' && ruc === '1899060377001') {
            return res.status(400).json({
                message: AssociationStatus.ASOCIACION_INCORRECTA,
                description: 'Comercio no pertenece al RUC'
            });
        }

        //CASE SEVEN
        if (tid === '55526987' && code === '700') {
            return res.status(400).json({
                message: AssociationStatus.ASOCIACION_INCORRECTA,
                description: 'Terminal no pertenece al comercio'
            });
        }

        //CASE EIGHT
        if (code === '800') {
            return res.status(400).json({
                message: AssociationStatus.ASOCIACION_INCORRECTA,
                description: 'El comercio no dispone de una Cuenta de BA'
            });
        }

        console.log('📦 Commerce recibido:', tid, ruc, code);
        //CASE ONE
        return res.status(200).json({
            message: AssociationStatus.ASOCIACION_CORRECTA,
            description: 'Procesamiento exitoso',
            commerce: {
                name: 'Comercio Ejemplo S.A.',
                address: 'Av. Siempre Viva 123',
                phone: '098185769',
                city: 'Quito',
                legalRepresentative: 'Juan Pérez',
                activityType: 'Venta al por menor',
                cuenta: '1234567890',
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