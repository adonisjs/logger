/*
* @poppinss/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/// <reference path="../src/contracts.ts" />

declare module '@ioc:Adonis/Src/Logger' {
  import { LoggerContract as BaseContract, LoggerConfigContract } from '@poppinss/logger/contracts'

  export interface LoggerContract extends BaseContract {}
  export { LoggerConfigContract }

  const Logger: LoggerContract
  export default Logger
}
