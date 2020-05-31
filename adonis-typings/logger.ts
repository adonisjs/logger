/*
* @adonisjs/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

declare module '@ioc:Adonis/Core/Logger' {
  import {
    Level,
    TimeFn,
    redactOptions,
    PrettyOptions,
    SerializerFn,
    LevelMapping,
    Bindings,
    DestinationStream,
  } from 'pino'

  /**
   * The formatters accepted by pino
   */
  export type Formatters = {
    level? (labelName: string, labelNumber: number): Object
    bindings? (bindings: Bindings): Object,
    log? (log: Object): Object
  }

  /**
   * Config shape
   */
  export type LoggerConfig = {
    name: string,
    level: Level | 'silent' | string,
    enabled: boolean,
    messageKey?: string,
    safe?: boolean,
    crlf?: boolean,
    timestamp?: TimeFn | boolean,
    customLevels?: {
      [key: string]: number,
    },
    formatters?: Formatters,
    useOnlyCustomLevels?: boolean,
    redact?: string[] | redactOptions,
    prettyPrint?: boolean | PrettyOptions,
    base?: { [key: string]: any } | null,
    serializers?: { [key: string]: SerializerFn },
    stream?: DestinationStream,
  }

  /**
   * Generic interface for all log levels
   */
  interface LogLevelFn {
    (message: string, ...values: any[]): void
    (mergingObject: any, message: string, ...values: any[]): void
  }

  /**
   * Logger interface that main and fake logger implements
   */
  export interface LoggerContract {
    level: string,
    levelNumber: number,
    levels: LevelMapping,
    pinoVersion: string,

    log (level: string, message: string, ...values: any[]): void
    log (level: string, mergingObject: object, message: string, ...values: any[]): void

    trace: LogLevelFn

    debug: LogLevelFn

    info: LogLevelFn

    warn: LogLevelFn

    error: LogLevelFn

    fatal: LogLevelFn

    isLevelEnabled (level: string): boolean,
    bindings (): { [key: string]: any },
    child (bindings: {
      level?: Level | string,
      serializers?: { [key: string]: SerializerFn },
      [key: string]: any,
    }): LoggerContract,
  }

  const Logger: LoggerContract
  export default Logger
}
