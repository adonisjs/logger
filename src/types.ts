/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
  type Level,
  type Bindings,
  type LevelMapping,
  type LoggerOptions,
  type DestinationStream,
  type ChildLoggerOptions,
  type TransportTargetOptions,
} from 'pino'

/**
 * Supported timestamp format keywords
 */
export type TimestampKeywords = 'iso' | 'unix' | 'epoch'
export type { TransportTargetOptions, Level, LevelMapping, ChildLoggerOptions, Bindings }

/**
 * Logger config inherited from pino logger options
 */
export type LoggerConfig = Omit<LoggerOptions<any>, 'browser' | 'timestamp'> & {
  /**
   * Whether the logger is enabled
   */
  enabled?: boolean
  /**
   * Destination stream for log output
   */
  desination?: DestinationStream
  /**
   * Timestamp configuration - can be a keyword, boolean, or function
   */
  timestamp?: TimestampKeywords | boolean | (() => string)
}

/**
 * Options accepted by the file target options
 */
export type FileTargetOptions = {
  /**
   * File path or file descriptor for the log destination
   */
  destination: string | number
  /**
   * Whether to create directories if they don't exist
   */
  mkdir?: boolean
  /**
   * Whether to append to existing file or overwrite
   */
  append?: boolean
}

/**
 * Options accepted by the pino-pretty module.
 * Copy-pasted from https://github.com/pinojs/pino-pretty/blob/master/index.d.ts
 */
export type PrettyTargetOptions = {
  /**
   * Whether to hide objects in the output
   */
  hideObject?: boolean
  /**
   * Whether to translate time format or custom time format string
   */
  translateTime?: boolean | string
  /**
   * Whether to show the log level first
   */
  levelFirst?: boolean
  /**
   * Key name for the log level
   */
  levelKey?: string
  /**
   * Label to use for the log level
   */
  levelLabel?: string
  /**
   * Key name for the log message
   */
  messageKey?: string
  /**
   * Whether to format output as a single line
   */
  singleLine?: boolean
  /**
   * Key name for the timestamp
   */
  timestampKey?: string
  /**
   * Minimum log level to display
   */
  minimumLevel?: Level
  /**
   * Message formatting configuration
   */
  messageFormat?:
    | false
    | string
    | ((log: Record<string, unknown>, messageKey: string, levelLabel: string) => string)
  /**
   * Whether to colorize the output
   */
  colorize?: boolean
  /**
   * Whether to use CRLF line endings
   */
  crlf?: boolean
  /**
   * Keys that should be treated as error-like objects
   */
  errorLikeObjectKeys?: string[]
  /**
   * Error properties to include in output
   */
  errorProps?: string
  /**
   * Keys to ignore in the output
   */
  ignore?: string
  /**
   * Keys to include in the output
   */
  include?: string
  /**
   * Whether to use synchronous writing
   */
  sync?: boolean
  /**
   * Destination for the pretty output
   */
  destination?: string | number | DestinationStream | NodeJS.WritableStream
  /**
   * Whether to append to existing file
   */
  append?: boolean
  /**
   * Whether to create directories if they don't exist
   */
  mkdir?: boolean
  /**
   * Custom prettifiers for specific keys
   */
  customPrettifiers?: Record<string, (inputData: string | object) => string>
  /**
   * Custom log levels configuration
   */
  customLevels?: string | object
  /**
   * Custom colors configuration
   */
  customColors?: string | object
  /**
   * Whether to use only custom properties
   */
  useOnlyCustomProps?: boolean
}

/**
 * Logger manager config
 */
export type LoggerManagerConfig<KnownLoggers extends Record<string, LoggerConfig>> = {
  /**
   * Default logger key to use
   */
  default: keyof KnownLoggers
  /**
   * Map of logger configurations
   */
  loggers: KnownLoggers
}
