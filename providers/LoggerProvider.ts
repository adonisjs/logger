/**
 * @module @adonisjs/logger
*/

/*
* @adonisjs/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { IocContract } from '@adonisjs/fold'
import { Logger } from '../src/Logger'

export default class LoggerProvider {
  constructor (protected $container: IocContract) {}

  public register () {
    this.$container.singleton('Adonis/Core/Logger', () => {
      return new Logger(this.$container.use('Adonis/Core/Config').get('app.logger', {}))
    })
  }
}
