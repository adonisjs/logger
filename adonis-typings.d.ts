/*
* @poppinss/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

declare module '@ioc:Adonis/Src/Logger' {
  /// <reference path="./src/contracts.ts" />
  import { LoggerContract as BaseContract } from '@poppinss/logger/contracts'
  interface LoggerContract extends BaseContract {}

  const Logger: LoggerContract
  export default Logger
}
