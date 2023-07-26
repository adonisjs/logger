/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Logger as PinoLogger } from 'pino'

import debug from './debug.js'
import { Logger } from './logger.js'
import { LoggerConfig, LoggerManagerConfig } from './types.js'

/**
 * Logger manager is used to manage multiple instances of the Logger. The
 * loggers are created using the default config and the logger instances
 * are cached forever.
 */
export class LoggerManager<
  KnownLoggers extends Record<string, LoggerConfig>,
> extends Logger<LoggerConfig> {
  /**
   * Registered config
   */
  #config: LoggerManagerConfig<KnownLoggers>

  /**
   * Created loggers. Logger instances are cached forever
   */
  #loggers: Map<keyof KnownLoggers, Logger<LoggerConfig>> = new Map()

  constructor(config: LoggerManagerConfig<KnownLoggers>) {
    super(config.loggers[config.default])
    this.#config = config
    debug('creating logger manager. config: %O', this.#config)
  }

  /**
   * Creates an instance of the logger
   */
  protected createLogger<K extends keyof KnownLoggers>(logger: K, config: KnownLoggers[K]) {
    if (!config.name && typeof logger === 'string') {
      config.name = logger
    }

    return new Logger(config)
  }

  /**
   * Get instance of a logger
   */
  use<K extends keyof KnownLoggers>(logger: K): Logger<KnownLoggers[K]>
  use(): Logger<LoggerConfig>
  use<K extends keyof KnownLoggers>(logger?: K): Logger<KnownLoggers[K]> | Logger<LoggerConfig> {
    let loggerToUse = logger || this.#config.default

    if (this.#loggers.has(loggerToUse)) {
      debug('using logger from cache. name: "%s"', logger)
      return this.#loggers.get(loggerToUse)! as Logger<KnownLoggers[K]>
    }

    const config = this.#config.loggers[loggerToUse]
    debug('creating logger. name: "%s", config: %O', logger, config)

    const loggerInstance = this.createLogger(loggerToUse, config)
    this.#loggers.set(loggerToUse, loggerInstance)

    return loggerInstance
  }

  /**
   * Create a logger instance from the config. The created instance
   * is not managed by the manager
   */
  create(config: LoggerConfig, pino?: PinoLogger) {
    return new Logger(config, pino)
  }
}
