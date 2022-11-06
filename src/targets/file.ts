/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { FileTargetOptions, TransportTargetOptions, Level } from '../types.js'

/**
 * Construct options object for the file target.
 */
export function file(options?: FileTargetOptions, level?: string | Level): TransportTargetOptions {
  return {
    target: 'pino/file',
    level: level || 'info',
    options: options || {},
  }
}
