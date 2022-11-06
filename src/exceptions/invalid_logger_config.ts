/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@poppinss/utils'

/**
 * Exception raised when the logger config is invalid
 */
export class InvalidLoggerConfigException extends Exception {
  static code = 'E_INVALID_LOGGER_CONFIG'
  static status = 500
}
