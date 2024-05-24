/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export { Logger } from './src/logger.js'
export { targets } from './src/targets/main.js'
export { defineConfig } from './src/define_config.js'
export { LoggerManager } from './src/logger_manager.js'
export {
  transport,
  destination,
  multistream,
  stdSerializers,
  stdTimeFunctions,
} from './src/pino.js'

export type { Level as LoggerLevel } from './src/types.js'
