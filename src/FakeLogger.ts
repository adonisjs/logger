/**
 * @module @poppinss/logger
*/

/*
* @poppinss/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Level, SerializerFn } from 'pino'
import { Logger } from './Logger'

/**
 * Fake logger that sets a custom logger stream and returns
 * the log messages as an array vs writing them to `stdout`.
 */
export class FakeLogger extends Logger {
  /**
   * An array of in-memory logs
   */
  public get logs (): any[] {
    return (this.$config.stream as any).logs
  }

  /**
   * Returns the child fake logger. All logs from the child
   * are writte to the same top level stream
   */
  public child (bindings: {
    level?: Level | string,
    serializers?: { [key: string]: SerializerFn },
    [key: string]: any,
  }) {
    return new FakeLogger(this.$config, this.pino.child(bindings))
  }

  /**
   * Clear in-memory logs
   */
  public clear () {
    (this.$config.stream as any).logs = []
  }
}
