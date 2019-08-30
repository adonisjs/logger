/**
 * @module @poppinss/logger
 */

/*
* @poppinss/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import Pino from 'pino'
import { DeepReadonly } from 'ts-essentials'
import { LoggerConfigContract } from './contracts'

/**
 * Returns an instance of pino logger by adjusting the config options
 */
export function getPino (options: DeepReadonly<LoggerConfigContract>): Pino.Logger {
  const pinoOptions = Object.assign({ changeLevelName: options.levelKey || 'level' }, options)
  return options.stream ? Pino(pinoOptions, options.stream) : Pino(pinoOptions)
}
