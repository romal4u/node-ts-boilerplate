import { AuthController } from '../../controllers/AuthController'
import { Request, Response, Router } from 'express'
import { validatorRegister, validatorLogin } from '../../middleware/validation/auth'
import Container from 'typedi'

const router = Router()

const authController = Container.get(AuthController)

router.post('/login', [validatorLogin],  async (req: Request, res: Response) => authController.login(req, res));
router.post('/register', [validatorRegister], async (req: Request, res: Response) => authController.register(req, res))
// router.post('/change-password', [checkJwt, validatorChangePassword], changePassword);

export default router
