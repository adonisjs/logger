/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Writable } from 'node:stream'

import { Logger } from '../index.js'
import { LoggerConfig } from '../src/types.js'
import { defineConfig } from '../src/define_config.js'
import { LoggerManager } from '../src/logger_manager.js'

function getFakeStream(fn: (line: string) => boolean) {
  const stream = new Writable()
  stream.write = fn
  return stream
}

test.group('Logger manager', () => {
  test('create logger instances only once', ({ assert, expectTypeOf }) => {
    const config = defineConfig({
      default: 'main',
      loggers: {
        main: {
          level: 'info' as const,
        },
        app: {
          level: 'trace' as const,
        },
      },
    })

    const manager = new LoggerManager(config)
    expectTypeOf(manager.use('app')).toEqualTypeOf<Logger<{ level: 'trace' }>>()
    expectTypeOf(manager.use('main')).toEqualTypeOf<Logger<{ level: 'info' }>>()
    expectTypeOf(manager.use()).toEqualTypeOf<Logger<LoggerConfig>>()

    assert.instanceOf(manager.use('app'), Logger)
    assert.instanceOf(manager.use('main'), Logger)

    assert.strictEqual(manager.use('app'), manager.use('app'))
    assert.strictEqual(manager.use('main'), manager.use('main'))
  })

  test('use default logger', ({ assert }) => {
    const messages: string[] = []

    const config = defineConfig({
      default: 'main',
      loggers: {
        main: {
          enabled: true,
          level: 'trace',
          desination: getFakeStream((message) => {
            messages.push(message.trim())
            return true
          }),
        },
        app: {},
      },
    })

    const manager = new LoggerManager(config)
    const logger = manager.use()

    logger.trace('hello trace')
    logger.debug('hello debug')
    logger.info('hello info')
    logger.warn('hello warn')
    logger.error('hello error')
    logger.fatal('hello fatal')

    assert.deepEqual(
      messages.map((m) => {
        const parsed = JSON.parse(m)
        return { level: parsed.level, msg: parsed.msg }
      }),
      [
        {
          level: 10,
          msg: 'hello trace',
        },
        {
          level: 20,
          msg: 'hello debug',
        },
        {
          level: 30,
          msg: 'hello info',
        },
        {
          level: 40,
          msg: 'hello warn',
        },
        {
          level: 50,
          msg: 'hello error',
        },
        {
          level: 60,
          msg: 'hello fatal',
        },
      ]
    )
  })

  test('log using the default logger', ({ assert }) => {
    const messages: string[] = []

    const config = defineConfig({
      default: 'main',
      loggers: {
        main: {
          enabled: true,
          level: 'trace',
          desination: getFakeStream((message) => {
            messages.push(message.trim())
            return true
          }),
        },
        app: {},
      },
    })

    const manager = new LoggerManager(config)
    manager.trace('hello trace')
    manager.debug('hello debug')
    manager.info('hello info')
    manager.warn('hello warn')
    manager.error('hello error')
    manager.fatal('hello fatal')

    assert.deepEqual(
      messages.map((m) => {
        const parsed = JSON.parse(m)
        return { level: parsed.level, msg: parsed.msg }
      }),
      [
        {
          level: 10,
          msg: 'hello trace',
        },
        {
          level: 20,
          msg: 'hello debug',
        },
        {
          level: 30,
          msg: 'hello info',
        },
        {
          level: 40,
          msg: 'hello warn',
        },
        {
          level: 50,
          msg: 'hello error',
        },
        {
          level: 60,
          msg: 'hello fatal',
        },
      ]
    )
  })

  test('use log methods when default logger is disabled', ({ assert }) => {
    const messages: string[] = []

    const config = defineConfig({
      default: 'main',
      loggers: {
        main: {
          enabled: false,
          level: 'trace',
          desination: getFakeStream((message) => {
            messages.push(message.trim())
            return true
          }),
        },
        app: {},
      },
    })

    const manager = new LoggerManager(config)
    manager.trace('hello trace')
    manager.debug('hello debug')
    manager.info('hello info')
    manager.warn('hello warn')
    manager.error('hello error')
    manager.fatal('hello fatal')

    assert.deepEqual(
      messages.map((m) => {
        const parsed = JSON.parse(m)
        return { level: parsed.level, msg: parsed.msg }
      }),
      []
    )
  })

  test('create on-demand logger', ({ assert }) => {
    const messages: string[] = []

    const config = defineConfig({
      default: 'main',
      loggers: {
        main: {
          enabled: true,
          level: 'trace',
          desination: getFakeStream((message) => {
            messages.push(message.trim())
            return true
          }),
        },
        app: {},
      },
    })

    const manager = new LoggerManager(config)
    const logger = manager.create({
      enabled: true,
      level: 'warn',
      desination: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
    })

    logger.trace('hello trace')
    logger.debug('hello debug')
    logger.info('hello info')
    logger.warn('hello warn')
    logger.error('hello error')
    logger.fatal('hello fatal')

    assert.deepEqual(
      messages.map((m) => {
        const parsed = JSON.parse(m)
        return { level: parsed.level, msg: parsed.msg }
      }),
      [
        {
          level: 40,
          msg: 'hello warn',
        },
        {
          level: 50,
          msg: 'hello error',
        },
        {
          level: 60,
          msg: 'hello fatal',
        },
      ]
    )
  })
})
