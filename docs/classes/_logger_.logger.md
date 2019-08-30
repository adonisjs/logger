**[@poppinss/logger](../README.md)**

[Globals](../README.md) › ["Logger"](../modules/_logger_.md) › [Logger](_logger_.logger.md)

# Class: Logger

Logger class built on top of pino with couple of changes in
the configuration. You can access the underlying `pino`
object using `logger.pino`.

## Hierarchy

* **Logger**

  * [FakeLogger](_fakelogger_.fakelogger.md)

## Implements

* [LoggerContract](../interfaces/_contracts_.loggercontract.md)

## Index

### Constructors

* [constructor](_logger_.logger.md#constructor)

### Properties

* [$config](_logger_.logger.md#protected-$config)
* [pino](_logger_.logger.md#pino)

### Accessors

* [LOG_VERSION](_logger_.logger.md#log_version)
* [level](_logger_.logger.md#level)
* [levelNumber](_logger_.logger.md#levelnumber)
* [levels](_logger_.logger.md#levels)
* [pinoVersion](_logger_.logger.md#pinoversion)

### Methods

* [bindings](_logger_.logger.md#bindings)
* [child](_logger_.logger.md#child)
* [debug](_logger_.logger.md#debug)
* [error](_logger_.logger.md#error)
* [fatal](_logger_.logger.md#fatal)
* [info](_logger_.logger.md#info)
* [isLevelEnabled](_logger_.logger.md#islevelenabled)
* [log](_logger_.logger.md#log)
* [trace](_logger_.logger.md#trace)
* [warn](_logger_.logger.md#warn)

## Constructors

###  constructor

\+ **new Logger**(`$config`: DeepReadonly‹[LoggerConfigContract](../modules/_contracts_.md#loggerconfigcontract)›, `pino?`: Pino.Logger): *[Logger](_logger_.logger.md)*

**Parameters:**

Name | Type |
------ | ------ |
`$config` | DeepReadonly‹[LoggerConfigContract](../modules/_contracts_.md#loggerconfigcontract)› |
`pino?` | Pino.Logger |

**Returns:** *[Logger](_logger_.logger.md)*

## Properties

### `Protected` $config

• **$config**: *DeepReadonly‹[LoggerConfigContract](../modules/_contracts_.md#loggerconfigcontract)›*

___

###  pino

• **pino**: *Pino.Logger*

## Accessors

###  LOG_VERSION

• **get LOG_VERSION**(): *number*

Returns the log formatting version

**Returns:** *number*

___

###  level

• **get level**(): *string*

Returns the current logger level

**Returns:** *string*

___

###  levelNumber

• **get levelNumber**(): *number*

Returns the current logger level number

**Returns:** *number*

___

###  levels

• **get levels**(): *Pino.LevelMapping*

A map of levels

**Returns:** *Pino.LevelMapping*

___

###  pinoVersion

• **get pinoVersion**(): *string*

Returns the pino version

**Returns:** *string*

## Methods

###  bindings

▸ **bindings**(): *object*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

Returns default bindings for the logger

**Returns:** *object*

* \[ **key**: *string*\]: any

___

###  child

▸ **child**(`bindings`: object): *[Logger](_logger_.logger.md)*

Returns a child logger instance

**Parameters:**

Name | Type |
------ | ------ |
`bindings` | object |

**Returns:** *[Logger](_logger_.logger.md)*

___

###  debug

▸ **debug**(`message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

Log message at debug level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **debug**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`mergingObject` | any |
`message` | string |
`...values` | any[] |

**Returns:** *void*

___

###  error

▸ **error**(`message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

Log message at error level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **error**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`mergingObject` | any |
`message` | string |
`...values` | any[] |

**Returns:** *void*

___

###  fatal

▸ **fatal**(`message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

Log message at fatal level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **fatal**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`mergingObject` | any |
`message` | string |
`...values` | any[] |

**Returns:** *void*

___

###  info

▸ **info**(`message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

Log message at info level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **info**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`mergingObject` | any |
`message` | string |
`...values` | any[] |

**Returns:** *void*

___

###  isLevelEnabled

▸ **isLevelEnabled**(`level`: string): *boolean*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

Returns a boolean telling if level is enabled or
not.

**Parameters:**

Name | Type |
------ | ------ |
`level` | string |

**Returns:** *boolean*

___

###  log

▸ **log**(`level`: string, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

Log message for any named level

**Parameters:**

Name | Type |
------ | ------ |
`level` | string |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **log**(`level`: string, `mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`level` | string |
`mergingObject` | any |
`message` | string |
`...values` | any[] |

**Returns:** *void*

___

###  trace

▸ **trace**(`message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

Log message at trace level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **trace**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`mergingObject` | any |
`message` | string |
`...values` | any[] |

**Returns:** *void*

___

###  warn

▸ **warn**(`message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

Log message at warn level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **warn**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`mergingObject` | any |
`message` | string |
`...values` | any[] |

**Returns:** *void*