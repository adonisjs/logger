/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { type PrettyTargetOptions } from './types.ts'

export const destinations = {
  pretty(options?: PrettyTargetOptions) {
    return require('pino-pretty')(options)
  },
}
