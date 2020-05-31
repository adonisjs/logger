/*
* @adonisjs/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { Writable } from 'stream'
import { Logger, FakeLogger } from '../standalone'

function getFakeStream (fn: ((line: string) => boolean)) {
  const stream = new Writable()
  stream.write = fn
  return stream
}

test.group('Logger', () => {
  test('log message at all log levels', (assert) => {
    const messages: string[] = []

    const logger = new Logger({
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      enabled: true,
      stream: getFakeStream((message) => {
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

    assert.deepEqual(messages.map((m) => {
      const parsed = JSON.parse(m)
      return { level: parsed.level, msg: parsed.msg }
    }), [
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
    ])
  })

  test('log message as object at all log levels', (assert) => {
    const messages: string[] = []

    const logger = new Logger({
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      enabled: true,
      stream: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
    })

    logger.trace({ hello: 'trace' })
    logger.debug({ hello: 'debug' })
    logger.info({ hello: 'info' })
    logger.warn({ hello: 'warn' })
    logger.error({ hello: 'error' })
    logger.fatal({ hello: 'fatal' })

    assert.deepEqual(messages.map((m) => {
      const parsed = JSON.parse(m)
      return { level: parsed.level, hello: parsed.hello }
    }), [
      {
        level: 10,
        hello: 'trace',
      },
      {
        level: 20,
        hello: 'debug',
      },
      {
        level: 30,
        hello: 'info',
      },
      {
        level: 40,
        hello: 'warn',
      },
      {
        level: 50,
        hello: 'error',
      },
      {
        level: 60,
        hello: 'fatal',
      },
    ])
  })

  test('return current log level', (assert) => {
    const logger = new Logger({
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      enabled: true,
    })
    assert.equal(logger.level, 'trace')
    assert.equal(logger.levelNumber, 10)
  })

  test('do not log below the set level', (assert) => {
    const messages: string[] = []

    const logger = new Logger({
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
      enabled: true,
      stream: getFakeStream((message) => {
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

    assert.deepEqual(messages.map((m) => {
      const parsed = JSON.parse(m)
      return { level: parsed.level, msg: parsed.msg }
    }), [
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
    ])
  })

  test('change level for a child logger', (assert) => {
    const messages: string[] = []

    const logger = new Logger({
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
      enabled: true,
      stream: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
    })

    const child = logger.child({ level: 'trace' })

    child.trace('hello trace')
    child.debug('hello debug')
    child.info('hello info')
    child.warn('hello warn')
    child.error('hello error')
    child.fatal('hello fatal')

    assert.deepEqual(messages.map((m) => {
      const parsed = JSON.parse(m)
      return { level: parsed.level, msg: parsed.msg }
    }), [
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
    ])
  })

  test('log using fake logger', (assert) => {
    const logger = new FakeLogger({
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
      enabled: true,
    })

    logger.info('hello info')
    assert.deepEqual(logger.logs.map(({ level, msg }) => {
      return { level, msg }
    }), [
      {
        level: 30,
        msg: 'hello info',
      },
    ])
  })

  test('log using fake child logger', (assert) => {
    const logger = new FakeLogger({
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
      enabled: true,
    })

    const child = logger.child({})
    child.info('hello info')

    assert.deepEqual(logger.logs.map(({ level, msg }) => {
      return { level, msg }
    }), [
      {
        level: 30,
        msg: 'hello info',
      },
    ])
  })

  test('clear logs', (assert) => {
    const logger = new FakeLogger({
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
      enabled: true,
    })

    logger.info('hello info')
    assert.deepEqual(logger.logs.map(({ level, msg }) => {
      return { level, msg }
    }), [
      {
        level: 30,
        msg: 'hello info',
      },
    ])

    logger.clear()
    assert.deepEqual(logger.logs, [])
  })

  test('use abstract logger when enabled is set to false', (assert) => {
    const logger = new Logger({
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
      enabled: false,
    })

    logger.info('hello info')
    logger.debug('hello debug')
    logger.fatal('hello fatal')
    logger.error('hello error')
    logger.warn('hello warn')
    logger.trace('hello trace')

    assert.equal(logger.level, 'info')
    assert.equal(logger.levelNumber, 30)
    assert.deepEqual(logger.child({}), logger)
    assert.deepEqual(logger.bindings(), {})
    assert.isFalse(logger.isLevelEnabled('info'))
    assert.equal(logger.pinoVersion, '6.2.1')
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

  test('define custom level formatter', (assert) => {
    const messages: string[] = []

    const logger = new Logger({
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      enabled: true,
      stream: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
      formatters: {
        level (_, levelNumber) {
          return { foo: levelNumber }
        },
      },
    })

    logger.trace('hello trace')
    logger.debug('hello debug')
    logger.info('hello info')
    logger.warn('hello warn')
    logger.error('hello error')
    logger.fatal('hello fatal')

    assert.deepEqual(messages.map((m) => {
      const parsed = JSON.parse(m)
      return { foo: parsed.foo, msg: parsed.msg }
    }), [
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
    ])
  })

  test('define custom log formatter', (assert) => {
    const messages: string[] = []

    const logger = new Logger({
      name: 'adonis-logger',
      level: 'trace',
      messageKey: 'msg',
      enabled: true,
      stream: getFakeStream((message) => {
        messages.push(message.trim())
        return true
      }),
      formatters: {
        log (log) {
          return Object.assign({ ticked: true }, log)
        },
      },
    })

    logger.trace('hello trace')
    logger.debug('hello debug')
    logger.info('hello info')
    logger.warn('hello warn')
    logger.error('hello error')
    logger.fatal('hello fatal')

    assert.deepEqual(messages.map((m) => {
      const parsed = JSON.parse(m)
      return { level: parsed.level, msg: parsed.msg, ticked: parsed.ticked }
    }), [
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
    ])
  })

  test('fake logger should ignore pretty print', (assert) => {
    const logger = new FakeLogger({
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
      enabled: true,
      prettyPrint: require('pino-pretty'),
    })

    logger.info('hello info')
    assert.deepEqual(logger.logs.map(({ level, msg }) => {
      return { level, msg }
    }), [
      {
        level: 30,
        msg: 'hello info',
      },
    ])
  })

  test('abstract logger should ignore pretty print', (assert) => {
    const logger = new Logger({
      name: 'adonis-logger',
      level: 'info',
      messageKey: 'msg',
      enabled: false,
      prettyPrint: require('pino-pretty'),
    })

    logger.info('hello info')
    logger.debug('hello debug')
    logger.fatal('hello fatal')
    logger.error('hello error')
    logger.warn('hello warn')
    logger.trace('hello trace')

    assert.equal(logger.level, 'info')
    assert.equal(logger.levelNumber, 30)
    assert.deepEqual(logger.child({}), logger)
    assert.deepEqual(logger.bindings(), {})
    assert.isFalse(logger.isLevelEnabled('info'))
    assert.equal(logger.pinoVersion, '6.2.1')
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
})
