/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Logger } from '../index.js'
import { LoggerFactory } from '../test_factories/logger.js'

test.group('Logger factory', () => {
  test('create logger instance using the factory', ({ assert }) => {
    const logger = new LoggerFactory().create()
    assert.instanceOf(logger, Logger)
    assert.isUndefined(logger.isEnabled)
  })

  test('create logger using custom config', ({ assert }) => {
    const logger = new LoggerFactory().merge({ enabled: true }).create()
    assert.instanceOf(logger, Logger)
    assert.isTrue(logger.isEnabled)
  })

  test('push logs to an array', ({ assert }) => {
    const logs: string[] = []
    const logger = new LoggerFactory().pushLogsTo(logs).merge({ enabled: true }).create()
    logger.info('hello world')

    assert.deepEqual(
      logs.map((line) => JSON.parse(line).msg),
      ['hello world']
    )
  })
})
