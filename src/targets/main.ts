/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { file } from './file.js'
import { Targets } from './create.js'
import { pretty } from './pretty.js'

/**
 * Create the targets array conditionally.
 */
export function targets(): Targets {
  return new Targets()
}

targets.file = file
targets.pretty = pretty
