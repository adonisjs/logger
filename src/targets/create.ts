/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { TransportTargetOptions } from '../types.js'

/**
 * Exposes the API to construct targets array conditionally.
 */
export class Targets {
  #collection: TransportTargetOptions[] = []

  /**
   * Add target to the list of targets
   */
  add(value: TransportTargetOptions): this {
    this.#collection.push(value)
    return this
  }

  /**
   * Conditionally add target to the list targets. The target will only be added
   *  if the `conditional` is true.
   *
   * ```ts
   * targets.if(process.env.NODE_ENV === 'development', {
   *   target: 'pino-pretty'
   * })
   * ```
   */
  pushIf(conditional: boolean, value: TransportTargetOptions | (() => TransportTargetOptions)) {
    if (conditional) {
      this.#collection.push(typeof value === 'function' ? value() : value)
    }

    return this
  }

  /**
   * Conditionally add target to the list targets. The target will only be added
   * unless the `conditional` is true.
   *
   * ```ts
   * targets.unless(process.env.NODE_ENV === 'production', {
   *   target: 'pino-pretty'
   * })
   * ```
   */
  pushUnless(conditional: boolean, value: TransportTargetOptions | (() => TransportTargetOptions)) {
    if (!conditional) {
      this.#collection.push(typeof value === 'function' ? value() : value)
    }

    return this
  }

  /**
   * Get targets array
   */
  toArray(): TransportTargetOptions[] {
    return this.#collection
  }
}
