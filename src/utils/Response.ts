import { Logger } from './Logger'

const log = new Logger(__filename)
export class Helpers {
  public static async formatResponse(
    status: number,
    isSuccess: boolean,
    message: string,
    payload?: object,
    count?: number,
  ): Promise<any> {
    const output = {
      status: status,
      data: {
        isSuccess,
        message,
        payload,
        count,
      },
    }
    log.debug('Response structure', output)
    return output
  }
}
