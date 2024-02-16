/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { TransportTargetOptions, Level, PrettyTargetOptions } from '../types.js'

/**
 * Construct options object for the pino-pretty target.
 */
export function pretty(
  options?: PrettyTargetOptions,
  level?: string | Level
): TransportTargetOptions {
  return {
    target: 'pino-pretty',
    level: level,
    options: options || {},
  }
}
