/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Writable } from 'node:stream'
import { Logger } from '../src/logger.js'
import type { LoggerConfig } from '../src/types.js'

export function getFakeStream(fn: (line: string) => boolean) {
  const stream = new Writable()
  stream.write = fn
  return stream
}

/**
 * Logger factory is used to generate logger class instances for
 * testing
 */
export class LoggerFactory {
  #options: LoggerConfig = {}
  #logsCollection?: string[]

  /**
   * Define an array that will be used to writing
   * logs
   */
  pushLogsTo(collection: string[]) {
    this.#logsCollection = collection
    return this
  }

  /**
   * Merge encryption factory options
   */
  merge(options: LoggerConfig) {
    Object.assign(this.#options, options)
    return this
  }

  /**
   * Create instance of the logger class
   */
  create() {
    if (this.#logsCollection) {
      this.#options.desination = getFakeStream((message) => {
        this.#logsCollection!.push(message.trim())
        return true
      })
    }

    return new Logger(this.#options)
  }
}
