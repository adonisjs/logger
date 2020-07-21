/*
 * @adonisjs/events
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { join } from 'path'
import { Registrar, Ioc } from '@adonisjs/fold'
import { Config } from '@adonisjs/config/build/standalone'

import { Logger } from '../src/Logger'

test.group('Logger Provider', () => {
	test('register event provider', async (assert) => {
		const ioc = new Ioc()
		ioc.bind('Adonis/Core/Config', () => {
			return new Config({
				app: {
					logger: {
						name: 'adonis',
						level: 30,
						enabled: true,
					},
				},
			})
		})

		const registrar = new Registrar(ioc, join(__dirname, '..'))
		await registrar.useProviders(['./providers/LoggerProvider']).registerAndBoot()

		assert.instanceOf(ioc.use('Adonis/Core/Logger'), Logger)
		assert.deepEqual(ioc.use('Adonis/Core/Logger'), ioc.use('Adonis/Core/Logger'))
	})

	test('raise exception when config is invalid', async (assert) => {
		const ioc = new Ioc()
		ioc.bind('Adonis/Core/Config', () => {
			return new Config({})
		})

		const registrar = new Registrar(ioc, join(__dirname, '..'))
		await registrar.useProviders(['./providers/LoggerProvider']).registerAndBoot()

		const fn = () => ioc.use('Adonis/Core/Logger')
		assert.throw(fn, 'E_INVALID_LOGGER_CONFIG: Missing required properties in logger config')
	})
})
