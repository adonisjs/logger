/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { type PrettyTargetOptions } from './types.ts'

/**
 * Collection of destination helpers for logger transport targets
 */
export const destinations = {
  /**
   * Creates a pretty-printed destination using pino-pretty
   * @param options - Optional pretty target options for formatting
   * @returns A pino-pretty destination instance
   */
  async pretty(options?: PrettyTargetOptions) {
    const { default: pinoPretty } = await import('pino-pretty')
    return pinoPretty(options)
  },
}
