/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
  pino,
  version,
  transport,
  multistream,
  destination,
  LoggerOptions,
  stdSerializers,
  stdTimeFunctions,
  type Logger as PinoLogger,
} from 'pino'
import type { LoggerConfig, TimestampKeywords, LevelMapping } from './types.js'

/**
 * Mapping pino timestamp formatters to keywords
 */
const TimestampFormatters: { [Keyword in TimestampKeywords]: () => string } = {
  iso: stdTimeFunctions.isoTime,
  epoch: stdTimeFunctions.epochTime,
  unix: stdTimeFunctions.unixTime,
}

/**
 * Returns an instance of pino logger by adjusting the config options
 */
export function createPino<Config extends LoggerConfig>(options: Config): PinoLogger<Config> {
  const { desination, timestamp, ...rest } = options
  const pinoOptions: LoggerOptions = Object.assign({}, rest)

  /**
   * Use pino formatters when a keyword is used
   */
  if (typeof timestamp === 'string' && TimestampFormatters[timestamp]) {
    pinoOptions.timestamp = TimestampFormatters[timestamp]
  }

  return (desination ? pino(pinoOptions, desination) : pino(pinoOptions)) as PinoLogger<Config>
}

/**
 * Static copy of pino level mappings
 */
export const levels: LevelMapping = {
  labels: {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal',
  },
  values: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10,
  },
}

export { destination, transport, stdSerializers, multistream, stdTimeFunctions, version }
