/*
* @poppinss/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/// <reference path="./src/contracts.ts" />

import * as Pino from 'pino'
import { Logger } from './src/Logger'
import { FakeLogger } from './src/FakeLogger'
import { LoggerConfigContract, LoggerContract } from '@poppinss/logger/contracts'
import { DeepReadonly } from 'ts-essentials'

/**
 * Returns an instance of pino logger by adjusting the config options
 */
function getPino (options: DeepReadonly<LoggerConfigContract>): Pino.Logger {
  const pinoOptions = Object.assign({ changeLevelName: options.levelKey || 'level' }, options)
  return options.stream ? Pino(pinoOptions, options.stream) : Pino(pinoOptions)
}

/**
 * Returns an instance of logger
 */
export function getLogger (config: DeepReadonly<LoggerConfigContract>) {
  return new Logger(config, getPino(config))
}

/**
 * Returns an instance of fake logger for testing
 */
export function getFakeLogger (config: DeepReadonly<LoggerConfigContract>) {
  /**
   * Faking the stream for the fake logger
   */
  const cloned = Object.assign({}, config, {
    stream: {
      logs: [],
      write: function writer (line: string) {
        const log = JSON.parse(line)
        delete log.timestamp
        this.logs.push(log)
      },
    },
  })

  return new FakeLogger(config, getPino(cloned))
}

export { LoggerContract }
