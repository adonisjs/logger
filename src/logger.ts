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

import { createPino, levels, version } from './pino.ts'
import type { LoggerConfig, LevelMapping, Bindings, ChildLoggerOptions } from './types.ts'

/**
 * A thin wrapper on top of Pino with support for disabling the logger.
 *
 * The config is same as the options accepted by pino with following additions
 *
 * - enabled: A flag to turn off the logger. You can still use the logger API, but
 *            nothing will be logged.
 * - destination: A stream to pass to pino as the destination stream. With pino, you
 *                pass it as the 2nd argument, with Logger, you pass it as an option.
 *
 * ```ts
 * const logger = new Logger({ enabled: true })
 * logger.info('hello world')
 * ```
 *
 * ```ts
 * const logger = new Logger({ enabled: true, destination: pino.destination(2) })
 * logger.error('something went wrong')
 * ```
 */
export class Logger<Config extends LoggerConfig = LoggerConfig> {
  /**
   * The underlying Pino logger instance
   */
  pino: PinoLogger<string>

  /**
   * Creates a new Logger instance
   * @param config - Logger configuration
   * @param pino - Optional Pino logger instance
   */
  constructor(
    protected config: Config,
    pino?: PinoLogger<string>
  ) {
    if (!this.config.enabled) {
      this.pino = abstractLogging
    } else {
      this.pino = pino || createPino(this.config)
    }
  }

  /**
   * Check if the logger is enabled
   * @returns True if the logger is enabled
   */
  get isEnabled(): boolean {
    return !!this.config.enabled
  }

  /**
   * A map of levels
   * @returns The level mapping object
   */
  get levels(): LevelMapping {
    if (!this.isEnabled) {
      return levels
    }

    return this.pino.levels
  }

  /**
   * Returns the current logger level
   * @returns The current log level as a string
   */
  get level(): string {
    if (!this.isEnabled) {
      return this.config.level || 'info'
    }

    return this.pino.level
  }

  /**
   * Update logger level
   * @param level - The new log level to set
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
   * @returns The current log level as a number
   */
  get levelNumber(): number {
    if (!this.isEnabled) {
      return levels.values[this.config.level || 'info']
    }

    return this.pino.levelVal
  }

  /**
   * Returns the pino version
   * @returns The Pino version string
   */
  get pinoVersion(): string {
    return version
  }

  /**
   * Returns the pino version
   * @returns The Pino version string
   */
  get version(): string {
    return version
  }

  /**
   * Returns a boolean telling if level is enabled or not
   * @param level - The log level to check
   * @returns True if the specified level is enabled
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
   * @param level - The log level to check
   * @param callback - The callback function to execute if level is enabled
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
   * @param level - The log level to use
   * @param message - The log message
   * @param values - Additional values to log
   */
  log(
    level: LevelWithSilent | keyof Config['customLevels'],
    message: string,
    ...values: any[]
  ): void
  /**
   * Log message for any named level with merging object
   * @param level - The log level to use
   * @param mergingObject - Object to merge with log entry
   * @param message - The log message
   * @param values - Additional values to log
   */
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

    this.pino[level as string](mergingObject, message, ...(values as []))
  }

  /**
   * Log message at trace level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  trace<T extends object>(obj: T, message?: string, ...values: any[]): void
  /**
   * Log message at trace level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  trace(obj: unknown, message?: string, ...values: any[]): void
  /**
   * Log message at trace level
   * @param message - The log message
   * @param values - Additional values to log
   */
  trace(message: string, ...values: any[]): void
  trace(mergingObject: any, message: string, ...values: any[]): void {
    this.log('trace', mergingObject, message, ...values)
  }

  /**
   * Log message at debug level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  debug<T extends object>(obj: T, message?: string, ...values: any[]): void
  /**
   * Log message at debug level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  debug(obj: unknown, message?: string, ...values: any[]): void
  /**
   * Log message at debug level
   * @param message - The log message
   * @param values - Additional values to log
   */
  debug(message: string, ...values: any[]): void
  debug(mergingObject: any, message: string, ...values: any[]): void {
    this.log('debug', mergingObject, message, ...values)
  }

  /**
   * Log message at info level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  info<T extends object>(obj: T, message?: string, ...values: any[]): void
  /**
   * Log message at info level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  info(obj: unknown, message?: string, ...values: any[]): void
  /**
   * Log message at info level
   * @param message - The log message
   * @param values - Additional values to log
   */
  info(message: string, ...values: any[]): void
  info(mergingObject: any, message: string, ...values: any[]): void {
    this.log('info', mergingObject, message, ...values)
  }

  /**
   * Log message at warn level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  warn<T extends object>(obj: T, message?: string, ...values: any[]): void
  /**
   * Log message at warn level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  warn(obj: unknown, message?: string, ...values: any[]): void
  /**
   * Log message at warn level
   * @param message - The log message
   * @param values - Additional values to log
   */
  warn(message: string, ...values: any[]): void
  warn(mergingObject: any, message: string, ...values: any[]): void {
    this.log('warn', mergingObject, message, ...values)
  }

  /**
   * Log message at error level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  error<T extends object>(obj: T, message?: string, ...values: any[]): void
  /**
   * Log message at error level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  error(obj: unknown, message?: string, ...values: any[]): void
  /**
   * Log message at error level
   * @param message - The log message
   * @param values - Additional values to log
   */
  error(message: string, ...values: any[]): void
  error(mergingObject: any, message: string, ...values: any[]): void {
    this.log('error', mergingObject, message, ...values)
  }

  /**
   * Log message at fatal level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  fatal<T extends object>(obj: T, message?: string, ...values: any[]): void
  /**
   * Log message at fatal level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  fatal(obj: unknown, message?: string, ...values: any[]): void
  /**
   * Log message at fatal level
   * @param message - The log message
   * @param values - Additional values to log
   */
  fatal(message: string, ...values: any[]): void
  fatal(mergingObject: any, message: string, ...values: any[]): void {
    this.log('fatal', mergingObject, message, ...values)
  }

  /**
   * Log message at silent level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  silent<T extends object>(obj: T, message?: string, ...values: any[]): void
  /**
   * Log message at silent level
   * @param obj - Object to log or merge
   * @param message - Optional log message
   * @param values - Additional values to log
   */
  silent(obj: unknown, message?: string, ...values: any[]): void
  /**
   * Log message at silent level
   * @param message - The log message
   * @param values - Additional values to log
   */
  silent(message: string, ...values: any[]): void
  silent(mergingObject: any, message: string, ...values: any[]): void {
    this.log('silent', mergingObject, message, ...values)
  }

  /**
   * Returns a child logger instance
   * @param bindings - Bindings to add to the child logger
   * @param options - Optional child logger options
   * @returns A new child logger instance
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
   * @returns The default bindings object
   */
  bindings(): Bindings {
    if (!this.isEnabled) {
      return {}
    }

    return this.pino.bindings()
  }
}
