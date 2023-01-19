/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { levels } from '../src/pino.js'
import { Logger } from '../src/logger.js'
import { getFakeStream } from '../test_factories/logger.js'

test.group('Logger', () => {
  test('log message at all log levels', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
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
    logger.silent('hello silent')

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

  test('handle sprintf subsitutes', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      desination: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
    })

    logger.info('hello %s', 'info')
    logger.info('hello %s %o', 'info', { url: '/' })
    logger.info('hello %s %j', 'info', { url: '/' })

    assert.deepEqual(
      messages.map((m) => {
        const parsed = JSON.parse(m)
        return { level: parsed.level, msg: parsed.msg }
      }),
      [
        {
          level: 30,
          msg: 'hello info',
        },
        {
          level: 30,
          msg: `hello info ${JSON.stringify({ url: '/' })}`,
        },
        {
          level: 30,
          msg: `hello info ${JSON.stringify({ url: '/' })}`,
        },
      ]
    )
  })

  test('return current log level', ({ assert }) => {
    const logger = new Logger({
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      enabled: true,
    })
    assert.equal(logger.level, 'trace')
    assert.equal(logger.levelNumber, 10)

    const logger1 = new Logger({
      name: 'adonis-logger',
      messageKey: 'msg',
      enabled: true,
    })
    assert.equal(logger1.level, 'info')
    assert.equal(logger1.levelNumber, 30)
  })

  test('find if log level falls in the given criteria', ({ assert }) => {
    const logger = new Logger({
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      enabled: true,
    })

    assert.isTrue(logger.isLevelEnabled('debug'))
  })

  test('do not log below the set level', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
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

  test('change level for a child logger', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      desination: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
    })

    const child = logger.child({}, { level: 'trace' })

    child.trace('hello trace')
    child.debug('hello debug')
    child.info('hello info')
    child.warn('hello warn')
    child.error('hello error')
    child.fatal('hello fatal')

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

  test('use custom redact options with a child logger', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
      desination: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
    })

    const child = logger.child(
      {},
      {
        redact: ['password'],
      }
    )

    child.trace({ password: 'secret' }, 'hello trace')
    child.debug({ password: 'secret' }, 'hello debug')
    child.info({ password: 'secret' }, 'hello info')
    child.warn({ password: 'secret' }, 'hello warn')
    child.error({ password: 'secret' }, 'hello error')
    child.fatal({ password: 'secret' }, 'hello fatal')

    assert.deepEqual(
      messages.map((m) => {
        const parsed = JSON.parse(m)
        return { level: parsed.level, msg: parsed.msg, password: parsed.password }
      }),
      [
        {
          level: 30,
          msg: 'hello info',
          password: '[Redacted]',
        },
        {
          level: 40,
          msg: 'hello warn',
          password: '[Redacted]',
        },
        {
          level: 50,
          msg: 'hello error',
          password: '[Redacted]',
        },
        {
          level: 60,
          msg: 'hello fatal',
          password: '[Redacted]',
        },
      ]
    )
  })

  test('use abstract logger when enabled is set to false', ({ assert }) => {
    const logger = new Logger({
      name: 'adonis-logger',
      messageKey: 'msg',
      enabled: false,
    })

    logger.info('hello info')
    logger.debug('hello debug')
    logger.fatal('hello fatal')
    logger.error('hello error')
    logger.warn('hello warn')
    logger.trace('hello trace')
    logger.silent('hello silent')

    assert.equal(logger.level, 'info')
    assert.equal(logger.levelNumber, 30)
    logger.level = 'trace'
    assert.equal(logger.level, 'trace')
    assert.equal(logger.levelNumber, 10)

    assert.deepEqual(logger.child({}), logger)
    assert.deepEqual(logger.bindings(), {})
    assert.isFalse(logger.isLevelEnabled('info'))
    assert.equal(logger.pinoVersion, '8.8.0')
    assert.equal(logger.version, '8.8.0')
    assert.deepEqual(logger.levels, {
      labels: {
        10: 'trace',
        20: 'debug',
        30: 'info',
        40: 'warn',
        50: 'error',
        60: 'fatal',
      },
      values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10,
      },
    })
  })

  test('define custom level formatter', ({ assert }) => {
    const messages: string[] = []
    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      formatters: {
        level(_, levelNumber) {
          return { foo: levelNumber }
        },
      },
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
        return { foo: parsed.foo, msg: parsed.msg }
      }),
      [
        {
          foo: 10,
          msg: 'hello trace',
        },
        {
          foo: 20,
          msg: 'hello debug',
        },
        {
          foo: 30,
          msg: 'hello info',
        },
        {
          foo: 40,
          msg: 'hello warn',
        },
        {
          foo: 50,
          msg: 'hello error',
        },
        {
          foo: 60,
          msg: 'hello fatal',
        },
      ]
    )
  })

  test('define custom log formatter', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      formatters: {
        log(log) {
          return Object.assign({ ticked: true }, log)
        },
      },
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
        return { level: parsed.level, msg: parsed.msg, ticked: parsed.ticked }
      }),
      [
        {
          level: 10,
          ticked: true,
          msg: 'hello trace',
        },
        {
          level: 20,
          ticked: true,
          msg: 'hello debug',
        },
        {
          level: 30,
          ticked: true,
          msg: 'hello info',
        },
        {
          level: 40,
          ticked: true,
          msg: 'hello warn',
        },
        {
          level: 50,
          ticked: true,
          msg: 'hello error',
        },
        {
          level: 60,
          ticked: true,
          msg: 'hello fatal',
        },
      ]
    )
  })

  test('update log level at runtime', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      formatters: {
        log(log) {
          return Object.assign({ ticked: true }, log)
        },
      },
      desination: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
    })

    logger.level = 'info'

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

  test('format timestamp using timestamp keywords', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      timestamp: 'unix',
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      desination: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
    })

    logger.info('hello trace')
    assert.isNumber(JSON.parse(messages[0]).time)
  })

  test('log conditionally', async ({ assert }) => {
    let stack: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
    })

    logger.ifLevelEnabled('trace', () => {
      stack.push('in trace')
    })

    await logger.ifLevelEnabled('info', async () => {
      stack.push('in info')
    })

    assert.deepEqual(stack, ['in info'])
  })

  test('log with custom levels', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      customLevels: {
        foo: 35,
      },
      desination: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
    })

    logger.log('foo', 'hello trace')

    assert.deepEqual(
      messages.map((m) => {
        const parsed = JSON.parse(m)
        return { level: parsed.level, msg: parsed.msg }
      }),
      [
        {
          level: 35,
          msg: 'hello trace',
        },
      ]
    )
  })

  test('listen for event when a child logger is created', ({ assert }) => {
    const messages: string[] = []

    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      desination: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
      onChild(pino) {
        pino.level = 'warn'
      },
    })

    const child = logger.child({}, { level: 'trace' })

    child.trace('hello trace')
    child.debug('hello debug')
    child.info('hello info')
    child.warn('hello warn')
    child.error('hello error')
    child.fatal('hello fatal')

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

  test('get default logger bindings', ({ assert }) => {
    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
    })

    assert.deepEqual(logger.bindings(), { name: 'adonis-logger' })
  })

  test('get logger levels', ({ assert }) => {
    const logger = new Logger({
      enabled: true,
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
    })

    assert.deepEqual(logger.levels, levels)
  })
})
