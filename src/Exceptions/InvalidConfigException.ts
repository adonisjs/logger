/*
 * @adonisjs/logger
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@poppinss/utils'
import exceptions from '../../exceptions.json'

export class InvalidConfigException extends Exception {
	public static invoke(): InvalidConfigException {
		const exception = exceptions.E_INVALID_LOGGER_CONFIG
		const error = new this(exception.message, exception.status, exception.code)
		error.help = exception.help.join('\n')
		return error
	}
}
