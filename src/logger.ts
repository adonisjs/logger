/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// @ts-expect-error "Package does not have types"
import abstractLogging from 'abstract-logging'
import type { LevelWithSilent, Logger as PinoLogger } from 'pino'

import { createPino, levels, version } from './pino.js'
import type { LoggerConfig, LevelMapping, Bindings, ChildLoggerOptions } from './types.js'

/**
 * A thin wrapper on top of Pino with support for disabling the logger.
 *
 * The config is same as the options accepted by pino with following additions
 *
 * - enabled: A flag to turn off the logger. You can still use the logger API, but
 *            nothing will be logged.
 * - destination: A stream to pass to pino as the desintation stream. With pino, you
 *                pass is at the 2nd argument, with Logger, you pass it as an option.
 *
 * ```ts
 * const logger = new Logger({ enabled: true })
 * logger.info('hello world')
 * ```
 *
 * ```ts
 * const logger = new Logger({ enabled: true, desintation: pino.destination(2) })
 * logger.error('something went wrong')
 * ```
 */
export class Logger<Config extends LoggerConfig = LoggerConfig> {
  pino: PinoLogger<keyof Config['customLevels'] & string>

  constructor(
    protected config: Config,
    pino?: PinoLogger<keyof Config['customLevels'] & string>
  ) {
    if (!this.config.enabled) {
      this.pino = abstractLogging
    } else {
      this.pino = pino || createPino(this.config)
    }
  }

  /**
   * Check if the logger is enabled
   */
  get isEnabled() {
    return this.config.enabled
  }

  /**
   * A map of levels
   */
  get levels(): LevelMapping {
    if (!this.isEnabled) {
      return levels
    }

    return this.pino.levels
  }

  /**
   * Returns the current logger level
   */
  get level(): string {
    if (!this.isEnabled) {
      return this.config.level || 'info'
    }

    return this.pino.level
  }

  /**
   * Update logger level
   */
  set level(level: string) {
    if (!this.isEnabled) {
      this.config.level = level
      return
    }

    this.pino.level = level
  }

  /**
   * Returns the current logger level number
   */
  get levelNumber(): number {
    if (!this.isEnabled) {
      return levels.values[this.config.level || 'info']
    }

    return this.pino.levelVal
  }

  /**
   * Returns the pino version
   */
  get pinoVersion(): string {
    return version
  }

  /**
   * Returns the pino version
   */
  get version(): string {
    return version
  }

  /**
   * Returns a boolean telling if level is enabled or
   * not.
   */
  isLevelEnabled(level: string): boolean {
    if (!this.isEnabled) {
      return false
    }

    return this.pino.isLevelEnabled(level)
  }

  /**
   * Run the callback when the level is enabled. Helpful for
   * conditionally logging, especially when the processing
   * of computing log data is expensive.
   *
   * ```ts
   * logger.ifLevelEnabled('trace', () => {
   *   const data = inspect(someValue)
   *   logger.info(data)
   * })
   * ```
   */
  ifLevelEnabled(level: string, callback: (logger: this) => Promise<void>): Promise<void>
  ifLevelEnabled(level: string, callback: (logger: this) => void): void
  ifLevelEnabled(level: string, callback: (logger: this) => void): void | Promise<void> {
    if (this.isLevelEnabled(level)) {
      return callback(this)
    }
  }

  /**
   * Log message for any named level
   */
  log(
    level: LevelWithSilent | keyof Config['customLevels'],
    message: string,
    ...values: any[]
  ): void
  log(
    level: LevelWithSilent | keyof Config['customLevels'],
    mergingObject: any,
    message: string,
    ...values: any[]
  ): void
  log(
    level: LevelWithSilent | keyof Config['customLevels'],
    mergingObject: any,
    message: string,
    ...values: any[]
  ): void {
    /**
     * Abstract logger does not have "silent" method
     */
    if (!this.isEnabled) {
      return
    }

    if (values.length) {
      ;(this.pino[level] as any)(mergingObject, message, ...values)
    } else if (message) {
      ;(this.pino[level] as any)(mergingObject, message)
    } else {
      ;(this.pino[level] as any)(mergingObject)
    }
  }

  /**
   * Log message at trace level
   */
  trace<T extends object>(obj: T, message?: string, ...values: any[]): void
  trace(obj: unknown, message?: string, ...values: any[]): void
  trace(message: string, ...values: any[]): void
  trace(mergingObject: any, message: string, ...values: any[]): void {
    this.log('trace', mergingObject, message, ...values)
  }

  /**
   * Log message at debug level
   */
  debug<T extends object>(obj: T, message?: string, ...values: any[]): void
  debug(obj: unknown, message?: string, ...values: any[]): void
  debug(message: string, ...values: any[]): void
  debug(mergingObject: any, message: string, ...values: any[]): void {
    this.log('debug', mergingObject, message, ...values)
  }

  /**
   * Log message at info level
   */
  info<T extends object>(obj: T, message?: string, ...values: any[]): void
  info(obj: unknown, message?: string, ...values: any[]): void
  info(message: string, ...values: any[]): void
  info(mergingObject: any, message: string, ...values: any[]): void {
    this.log('info', mergingObject, message, ...values)
  }

  /**
   * Log message at warn level
   */
  warn<T extends object>(obj: T, message?: string, ...values: any[]): void
  warn(obj: unknown, message?: string, ...values: any[]): void
  warn(message: string, ...values: any[]): void
  warn(mergingObject: any, message: string, ...values: any[]): void {
    this.log('warn', mergingObject, message, ...values)
  }

  /**
   * Log message at error level
   */
  error<T extends object>(obj: T, message?: string, ...values: any[]): void
  error(obj: unknown, message?: string, ...values: any[]): void
  error(message: string, ...values: any[]): void
  error(mergingObject: any, message: string, ...values: any[]): void {
    this.log('error', mergingObject, message, ...values)
  }

  /**
   * Log message at fatal level
   */
  fatal<T extends object>(obj: T, message?: string, ...values: any[]): void
  fatal(obj: unknown, message?: string, ...values: any[]): void
  fatal(message: string, ...values: any[]): void
  fatal(mergingObject: any, message: string, ...values: any[]): void {
    this.log('fatal', mergingObject, message, ...values)
  }

  /**
   * Log message at silent level
   */
  silent<T extends object>(obj: T, message?: string, ...values: any[]): void
  silent(obj: unknown, message?: string, ...values: any[]): void
  silent(message: string, ...values: any[]): void
  silent(mergingObject: any, message: string, ...values: any[]): void {
    this.log('silent', mergingObject, message, ...values)
  }

  /**
   * Returns a child logger instance
   */
  child<ChildOptions extends ChildLoggerOptions>(
    bindings: Bindings,
    options?: ChildOptions
  ): Logger<Config> {
    if (!this.isEnabled) {
      return this
    }

    return new Logger(this.config, this.pino.child(bindings, options))
  }

  /**
   * Returns default bindings for the logger
   */
  bindings(): Bindings {
    if (!this.isEnabled) {
      return {}
    }

    return this.pino.bindings()
  }
}
