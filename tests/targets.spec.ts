/*
 * @adonisjs/logger
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { TransportTargetOptions } from 'pino'
import { targets } from '../src/targets/main.js'

test.group('Targets', () => {
  test('create transport for pino/file', ({ assert }) => {
    assert.deepEqual(targets.file(), {
      level: 'info',
      options: {},
      target: 'pino/file',
    })

    // With level
    assert.deepEqual(targets.file(undefined, 'trace'), {
      level: 'trace',
      options: {},
      target: 'pino/file',
    })

    // With options
    assert.deepEqual(targets.file({ destination: './' }, 'trace'), {
      level: 'trace',
      options: { destination: './' },
      target: 'pino/file',
    })
  })

  test('create transport for pino-pretty', ({ assert }) => {
    assert.deepEqual(targets.pretty(), {
      level: 'info',
      options: {},
      target: 'pino-pretty',
    })

    // With level
    assert.deepEqual(targets.pretty(undefined, 'trace'), {
      level: 'trace',
      options: {},
      target: 'pino-pretty',
    })

    // With options
    assert.deepEqual(targets.pretty({ colorize: true }, 'trace'), {
      level: 'trace',
      options: { colorize: true },
      target: 'pino-pretty',
    })
  })

  test('create targets array', ({ assert, expectTypeOf }) => {
    const pinoTargets = targets().add({ level: 'info', target: './', options: {} }).toArray()
    expectTypeOf(pinoTargets).toEqualTypeOf<TransportTargetOptions[]>()

    assert.deepEqual(pinoTargets, [
      {
        level: 'info',
        target: './',
        options: {},
      },
    ])
  })

  test('create targets array conditionally', ({ assert, expectTypeOf }) => {
    const pinoTargets = targets()
      .pushIf(false, { level: 'info', target: './', options: {} })
      .toArray()

    expectTypeOf(pinoTargets).toEqualTypeOf<TransportTargetOptions[]>()
    assert.deepEqual(pinoTargets, [])
  })

  test('create targets array from helper methods', ({ assert, expectTypeOf }) => {
    const pinoTargets = targets()
      .pushIf(true, targets.file({ destination: './' }))
      .pushUnless(false, targets.pretty({ destination: './' }))
      .toArray()

    expectTypeOf(pinoTargets).toEqualTypeOf<TransportTargetOptions[]>()
    assert.deepEqual(pinoTargets, [
      {
        target: 'pino/file',
        options: {
          destination: './',
        },
        level: 'info',
      },
      {
        target: 'pino-pretty',
        options: {
          destination: './',
        },
        level: 'info',
      },
    ])
  })

  test('create targets lazily', ({ assert, expectTypeOf }) => {
    const pinoTargets = targets()
      .pushIf(true, () => targets.file({ destination: './' }))
      .pushUnless(false, () => targets.pretty({ destination: './' }, 'trace'))
      .toArray()

    expectTypeOf(pinoTargets).toEqualTypeOf<TransportTargetOptions[]>()
    assert.deepEqual(pinoTargets, [
      {
        target: 'pino/file',
        options: {
          destination: './',
        },
        level: 'info',
      },
      {
        target: 'pino-pretty',
        options: {
          destination: './',
        },
        level: 'trace',
      },
    ])
  })
})
