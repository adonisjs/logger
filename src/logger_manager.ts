/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Logger as PinoLogger } from 'pino'

import debug from './debug.ts'
import { Logger } from './logger.ts'
import { type LoggerConfig, type LoggerManagerConfig } from './types.ts'

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
  #loggers: Map<keyof KnownLoggers, Logger<KnownLoggers[keyof KnownLoggers]>> = new Map()

  /**
   * Creates a new LoggerManager instance
   * @param config - The logger manager configuration
   */
  constructor(config: LoggerManagerConfig<KnownLoggers>) {
    super(config.loggers[config.default])
    this.#config = config
    debug('creating logger manager. config: %O', this.#config)
  }

  /**
   * Creates an instance of the logger
   * @param logger - The logger key
   * @param config - The logger configuration
   * @returns A new logger instance
   */
  protected createLogger<K extends keyof KnownLoggers>(
    logger: K,
    config: KnownLoggers[K]
  ): Logger<KnownLoggers[K]> {
    if (!config.name && typeof logger === 'string') {
      config.name = logger
    }

    return new Logger(config)
  }

  /**
   * Get instance of a logger
   * @param logger - The logger key to retrieve
   * @returns The logger instance
   */
  use<K extends keyof KnownLoggers>(logger: K): Logger<KnownLoggers[K]>
  /**
   * Get instance of the default logger
   * @returns The default logger instance
   */
  use(): Logger<LoggerConfig>
  use<K extends keyof KnownLoggers>(logger?: K): Logger<KnownLoggers[K]> | Logger<LoggerConfig> {
    let loggerToUse = logger || this.#config.default

    if (this.#loggers.has(loggerToUse)) {
      debug('using logger from cache. name: "%s"', logger)
      return this.#loggers.get(loggerToUse)! as Logger<KnownLoggers[K]> | Logger<LoggerConfig>
    }

    const config = this.#config.loggers[loggerToUse]
    debug('creating logger. name: "%s", config: %O', loggerToUse, config)

    const loggerInstance = this.createLogger(loggerToUse, config)
    this.#loggers.set(loggerToUse, loggerInstance)

    return loggerInstance as Logger<KnownLoggers[K]> | Logger<LoggerConfig>
  }

  /**
   * Create a logger instance from the config. The created instance
   * is not managed by the manager
   * @param config - The logger configuration
   * @param pino - Optional Pino logger instance
   * @returns A new logger instance
   */
  create<Config extends LoggerConfig>(
    config: Config,
    pino?: PinoLogger<keyof Config['customLevels'] & string>
  ): Logger<Config> {
    return new Logger(config, pino)
  }
}
