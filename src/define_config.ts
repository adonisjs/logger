/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { RuntimeException } from '@poppinss/utils'

import type { LoggerConfig, LoggerManagerConfig } from './types.js'
import debug from './debug.js'

/**
 * Define the logger config. The config object must have a default property
 * pointing to the key within the loggers object.
 */
export function defineConfig<KnownLoggers extends Record<string, LoggerConfig>>(
  config: LoggerManagerConfig<KnownLoggers>
): LoggerManagerConfig<KnownLoggers> {
  if (!config.loggers) {
    throw new RuntimeException('Missing "loggers" property in logger config file')
  }

  if (!config.default) {
    throw new RuntimeException(
      'Missing "default" property in logger config. Specify a default logger'
    )
  }

  if (!config.loggers[config.default]) {
    throw new RuntimeException(
      `Missing "loggers.${String(config.default)}". It is referenced by the "default" logger`
    )
  }

  Object.keys(config.loggers).forEach((loggerName) => {
    const logger = config.loggers[loggerName]
    if (logger.transport && 'targets' in logger.transport) {
      logger.transport.targets.forEach((target) => {
        if (!target.level) {
          debug('inherting "%s" target level from "%s" logger', target.target, loggerName)
          target.level = logger.level
        }
      })
    }
  })

  return config
}
