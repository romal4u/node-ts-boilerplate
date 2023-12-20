import { AuthController } from '../../controllers/AuthController'
import { Request, Response, Router } from 'express'
import {
  validatorRegister,
  validatorLogin,
  validatorChangePassword,
  validatorSetUpMFA,
  validatorEnableMFA,
} from '../../middleware/validation/auth'
import Container from 'typedi'
import { checkJwt } from '../../middleware/checkJWT'

const router = Router()

const authController = Container.get(AuthController)

router.post('/login', [validatorLogin], async (req: Request, res: Response) => authController.login(req, res))
router.post('/register', [validatorRegister], async (req: Request, res: Response) => authController.register(req, res))

router.get('/setup-2fa', [validatorSetUpMFA], async (req: Request, res: Response) => authController.setUp2FA(req, res))
router.post('/enable-2fa', [validatorEnableMFA], async (req: Request, res: Response) =>
  authController.enable2FA(req, res),
)
router.post('/verify/otp', [validatorEnableMFA], async (req: Request, res: Response) =>
  authController.validateTOTP(req, res),
)

router.post('/change-password', [checkJwt, validatorChangePassword], async (req: Request, res: Response) =>
  authController.changePassword(req, res),
)
export default router
