import { Request, Response, Router } from 'express'

import v1 from './v1'

const router = Router()

router.use(`/v1`, v1)

router.get('/ping', (req: Request, res: Response) => {
  console.log('in ping service')
  res.send('OK')
})

router.get('/status', (req: Request, res: Response) => {
  console.log('in ping service')
  res.status(200).send({status: 200, message: 'OK'})
})


export default router
