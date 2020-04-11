/**
 * @module @adonisjs/logger
*/

/*
* @adonisjs/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/// <reference path="../adonis-typings/logger.ts" />

import Pino from 'pino'
import { LoggerConfig } from '@ioc:Adonis/Core/Logger'

/**
 * Returns an instance of pino logger by adjusting the config options
 */
export function getPino (options: LoggerConfig): Pino.Logger {
  const pinoOptions = Object.assign({}, options)
  return options.stream ? Pino(pinoOptions as any, options.stream) : Pino(pinoOptions as any)
}
