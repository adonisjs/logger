/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { file } from './file.ts'
import { Targets } from './create.ts'
import { pretty } from './pretty.ts'

/**
 * Create the targets array conditionally.
 */
export function targets(): Targets {
  return new Targets()
}

targets.file = file
targets.pretty = pretty
