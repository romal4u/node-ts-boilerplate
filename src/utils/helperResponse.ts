import { Service } from 'typedi'

import { Helpers } from './Response'

@Service()
export class HelperResponse {
  public async response(result: any, res: any) {
    const status = result?.status || (result.isSuccess ? 200 : 400)
    const responseFormat = await Helpers.formatResponse(
      status,
      result.isSuccess,
      result?.message,
      result?.payload,
      result?.count,
    )
    return res.status(status).send(responseFormat)
  }
}
