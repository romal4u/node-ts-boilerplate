import { Router } from 'express'
import { validatorRegister } from 'middleware/validation/auth'

const router = Router()

// router.post('/login', [validatorLogin], login);
router.post('/register', [validatorRegister], register)
// router.post('/change-password', [checkJwt, validatorChangePassword], changePassword);

export default router
