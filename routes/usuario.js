const { Router } = require('express')
const { getAllUsers, createUser, putUsers, deleteUsers } = require('../controllers/usuario')
const { check } = require('express-validator')
const { validateRequest } = require('../middlewares/validate-req')
const { validateRole, emailExists, userExistsById } = require('../helpers/db-validators')

const router = Router()

router.get('/', getAllUsers)

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe tener por lo menos 6 caracteres').isLength({ min: 6 }),
    // check('rol','Rol invalido').isIn( ['USER', 'ADMIN'] ),
    check('rol').custom( validateRole ),
    check('correo', 'El correo proporcionado no es valido').isEmail(),
    check('correo').custom( emailExists ),
    validateRequest
], createUser)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    check('rol').custom( validateRole ),
    validateRequest
], putUsers)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    validateRequest
], deleteUsers)


module.exports = router