/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { defineConfig } from '../src/define_config.js'
import { LoggerConfig, LoggerManagerConfig } from '../src/types.js'

test.group('Define config', () => {
  test('define logger config', ({ assert, expectTypeOf }) => {
    const config = defineConfig({
      default: 'main',
      loggers: {
        main: {
          enabled: true,
        },
      },
    })

    expectTypeOf(config).toEqualTypeOf<LoggerManagerConfig<{ main: LoggerConfig }>>()
    assert.deepEqual(config, {
      default: 'main',
      loggers: {
        main: {
          enabled: true,
        },
      },
    })
  })

  test('raise exception when default logger is missing', ({ assert }) => {
    assert.throws(
      // @ts-expect-error
      () => defineConfig({ loggers: {} }),
      'Missing "default" property in logger config. Specify a default logger'
    )
  })

  test('raise exception when loggers list is missing', ({ assert }) => {
    assert.throws(
      // @ts-expect-error
      () => defineConfig({ default: 'main' }),
      'Missing "loggers" property in logger config file'
    )
  })

  test('raise exception when default logger in the list of loggers', ({ assert }) => {
    assert.throws(
      // @ts-expect-error
      () => defineConfig({ default: 'main', loggers: { foo: {} } }),
      'Missing "loggers.main". It is referenced by the "default" logger'
    )
  })
})
