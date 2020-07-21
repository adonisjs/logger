/*
 * @adonisjs/logger
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { IocContract } from '@adonisjs/fold'

export default class LoggerProvider {
	constructor(protected container: IocContract) {}

	/**
	 * Ensure config is valid
	 */
	private validateConfig(config: any) {
		if (config.name === undefined || config.enabled === undefined || config.level === undefined) {
			const { InvalidConfigException } = require('../src/Exceptions/InvalidConfigException')
			throw InvalidConfigException.invoke()
		}
	}

	/**
	 * Register logger
	 */
	public register() {
		this.container.singleton('Adonis/Core/Logger', () => {
			const config = this.container.use('Adonis/Core/Config').get('app.logger', {})
			this.validateConfig(config)

			const { Logger } = require('../src/Logger')
			return new Logger(config)
		})
	}
}
