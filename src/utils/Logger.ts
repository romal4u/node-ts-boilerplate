import * as path from 'path'

import httpContext from 'express-http-context'
import { DateTime } from 'luxon'
import * as winston from 'winston'

export class Logger {
  public static DEFAULT_SCOPE = 'app'

  private static parsePathToScope(filepath: string): string {
    if (filepath.indexOf(path.sep) >= 0) {
      filepath = filepath.replace(process.cwd(), '')
      filepath = filepath.replace(`${path.sep}src${path.sep}`, '')
      filepath = filepath.replace(`${path.sep}dist${path.sep}`, '')
      filepath = filepath.replace('.ts', '')
      filepath = filepath.replace('.js', '')
      filepath = filepath.replace(path.sep, ':')
      filepath = filepath.replace('\\', '/')
    }
    return filepath
  }

  private scope: string

  private winstonLogger: any

  constructor(scope?: string) {
    this.scope = Logger.parsePathToScope(scope ? scope : Logger.DEFAULT_SCOPE)
    this.winstonLogger = winston.createLogger({
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
      },
      format: winston.format.combine(winston.format.prettyPrint(), winston.format.json()),
      transports: [
        //To include debug level as well https://github.com/winstonjs/winston/issues/843#issuecomment-350548952
        new winston.transports.Console({ level: 'debug' }),
      ],
    })
  }

  public debug(...args): void {
    this.winstonLogger.debug(this.wrapJson(...args).logMessage, this.wrapJson(...args).meta)
  }

  public info(...args): void {
    this.winstonLogger.info(this.wrapJson(...args).logMessage, this.wrapJson(...args).meta)
  }

  public warn(...args): void {
    this.winstonLogger.warn(this.wrapJson(...args).logMessage, this.wrapJson(...args).meta)
  }

  public error(...args): void {
    this.winstonLogger.error(this.wrapJson(...args).logMessage, this.wrapJson(...args).meta)
  }

  public http(...args): void {
    this.winstonLogger.http(this.wrapJson(...args).logMessage, this.wrapJson(...args).meta)
  }

  public verbose(...args): void {
    this.winstonLogger.verbose(this.wrapJson(...args).logMessage, this.wrapJson(...args).meta)
  }

  public silly(...args): void {
    this.winstonLogger.silly(this.wrapJson(...args).logMessage, this.wrapJson(...args).meta)
  }

  private wrapJson(...arg) {
    let morgan = null
    const data = arg[1] || {}

    if (arg[0].logType === 'morgan') {
      morgan = arg[0]
      const { body, ...morganWithoutBody } = morgan // Remove the 'body' key from the 'morgan' object
      data.body = body
      morgan = morganWithoutBody
    }

    const logMessage = typeof arg[0] === 'string' ? arg[0] : ''
    return {
      logMessage: this.formatScope() + ' - ' + logMessage,
      meta: {
        data: process?.env?.NODE_ENV === 'development' ? data : this.safeStringify(data),
        reqId: httpContext.get('x-request-id') || '',
        reqUrl: httpContext.get('x-reqURL') || '',
        timestamp: DateTime.local(),
        method: arg['method'],
        ...(morgan ? morgan : {}), // Add the modified 'morgan' object without the 'body' key
      },
    }
  }

  private formatScope(): string {
    return `[${this.scope}]`
  }

  private safeStringify(obj: any, replacer = null) {
    const cache = new Set()
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          // Circular reference found, discard key
          return undefined
        }
        // Store value in our set
        cache.add(value)
      }
      return replacer ? replacer(key, value) : value
    })
  }
}
