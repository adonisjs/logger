/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { InvalidLoggerConfigException } from './exceptions/invalid_logger_config.js'
import type { LoggerConfig, LoggerManagerConfig } from './types.js'

/**
 * Define the logger config. The config object must have a default property
 * pointing to the key within the loggers object.
 */
export function defineConfig<KnownLoggers extends Record<string, LoggerConfig>>(
  config: LoggerManagerConfig<KnownLoggers>
): LoggerManagerConfig<KnownLoggers> {
  if (!config.default) {
    throw new InvalidLoggerConfigException('Missing "default" logger')
  }

  if (!config.loggers) {
    throw new InvalidLoggerConfigException(
      'Missing list of "loggers". Atleast one logger is required'
    )
  }

  if (!config.loggers[config.default]) {
    throw new InvalidLoggerConfigException(
      `Missing "loggers.${String(config.default)}". It is referenced by the "default" logger`
    )
  }

  return config
}
