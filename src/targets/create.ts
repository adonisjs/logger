/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { TransportTargetOptions } from '../types.ts'

/**
 * Exposes the API to construct targets array conditionally.
 */
export class Targets {
  /**
   * Collection of transport target options
   */
  #collection: TransportTargetOptions[] = []

  /**
   * Add target to the list of targets
   * @param value - The transport target options to add
   * @returns The current Targets instance for chaining
   */
  push(value: TransportTargetOptions): this {
    this.#collection.push(value)
    return this
  }

  /**
   * Conditionally add target to the list targets. The target will only be added
   * if the `conditional` is true.
   *
   * ```ts
   * targets.if(process.env.NODE_ENV === 'development', {
   *   target: 'pino-pretty'
   * })
   * ```
   * @param conditional - Condition to check before adding the target
   * @param value - The transport target options or factory function
   * @returns The current Targets instance for chaining
   */
  pushIf(
    conditional: boolean,
    value: TransportTargetOptions | (() => TransportTargetOptions)
  ): this {
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
   * @param conditional - Condition to check before adding the target
   * @param value - The transport target options or factory function
   * @returns The current Targets instance for chaining
   */
  pushUnless(
    conditional: boolean,
    value: TransportTargetOptions | (() => TransportTargetOptions)
  ): this {
    if (!conditional) {
      this.#collection.push(typeof value === 'function' ? value() : value)
    }

    return this
  }

  /**
   * Get targets array
   * @returns Array of transport target options
   */
  toArray(): TransportTargetOptions[] {
    return this.#collection
  }
}
