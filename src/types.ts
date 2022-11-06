/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
  Level,
  Bindings,
  LevelMapping,
  LoggerOptions,
  DestinationStream,
  ChildLoggerOptions,
  TransportTargetOptions,
} from 'pino'
export type TimestampKeywords = 'iso' | 'unix' | 'epoch'
export type { TransportTargetOptions, Level, LevelMapping, ChildLoggerOptions, Bindings }

/**
 * Logger config inherited from pino logger options
 */
export type LoggerConfig = Omit<LoggerOptions, 'browser' | 'timestamp'> & {
  enabled?: boolean
  desination?: DestinationStream
  timestamp?: TimestampKeywords | boolean | (() => string)
}

/**
 * Options accepted by the file target options
 */
export type FileTargetOptions = {
  destination: string | number
  mkdir?: boolean
  append?: boolean
}

/**
 * Options accepted by the pino-pretty module.
 * Copy-pasted from https://github.com/pinojs/pino-pretty/blob/master/index.d.ts
 */
export type PrettyTargetOptions = {
  hideObject?: boolean
  translateTime?: boolean | string
  levelFirst?: boolean
  levelKey?: string
  levelLabel?: string
  messageKey?: string
  singleLine?: boolean
  timestampKey?: string
  minimumLevel?: Level
  messageFormat?:
    | false
    | string
    | ((log: Record<string, unknown>, messageKey: string, levelLabel: string) => string)
  colorize?: boolean
  crlf?: boolean
  errorLikeObjectKeys?: string[]
  errorProps?: string
  ignore?: string
  include?: string
  sync?: boolean
  destination?: string | number | DestinationStream | NodeJS.WritableStream
  append?: boolean
  mkdir?: boolean
  customPrettifiers?: Record<string, (inputData: string | object) => string>
}

/**
 * Logger manager config
 */
export type LoggerManagerConfig<KnownLoggers extends Record<string, LoggerConfig>> = {
  default: keyof KnownLoggers
  loggers: KnownLoggers
}
