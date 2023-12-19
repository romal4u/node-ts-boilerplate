import { AuthController } from '../../controllers/AuthController'
import { Request, Response, Router } from 'express'
import { validatorRegister } from '../../middleware/validation/auth'
import Container from 'typedi'

const router = Router()

const authController = Container.get(AuthController)

// router.post('/login', [validatorLogin], login);
router.post('/register', [validatorRegister], async (req: Request, res: Response) => authController.register(req, res))
// router.post('/change-password', [checkJwt, validatorChangePassword], changePassword);

export default router
