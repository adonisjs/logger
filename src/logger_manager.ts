/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Logger as PinoLogger } from 'pino'

import { Logger } from './logger.js'
import { LoggerConfig, LoggerManagerConfig } from './types.js'

/**
 * Logger manager is used to manage multiple instances of the Logger. The
 * loggers are created using the default config and the logger instances
 * are cached forever.
 */
export class LoggerManager<
  KnownLoggers extends Record<string, LoggerConfig>
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
  use<K extends keyof KnownLoggers>(logger: K): Logger<KnownLoggers[K]> {
    if (!this.#loggers.has(logger)) {
      this.#loggers.set(logger, this.createLogger(logger, this.#config.loggers[logger]))
    }

    return this.#loggers.get(logger)! as Logger<KnownLoggers[K]>
  }

  /**
   * Create a logger instance from the config. The created instance
   * is not managed by the manager
   */
  create(config: LoggerConfig, pino?: PinoLogger) {
    return new Logger(config, pino)
  }
}
