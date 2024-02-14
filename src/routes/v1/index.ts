import { Request, Response, Router } from 'express'

import auth from './auth'

const router = Router()

router.use('/auth', auth)

router.get('/status', (req: Request, res: Response) => res.send('OK'))

export default router