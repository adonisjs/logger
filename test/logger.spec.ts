/*
* @poppinss/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/// <reference path="../src/contracts.ts" />

import * as test from 'japa'
import { Writable } from 'stream'
import { Logger, FakeLogger } from '../index'

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
})
