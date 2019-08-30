**[@poppinss/logger](../README.md)**

[Globals](../README.md) › ["FakeLogger"](../modules/_fakelogger_.md) › [FakeLogger](_fakelogger_.fakelogger.md)

# Class: FakeLogger

Fake logger that sets a custom logger stream and returns
the log messages as an array vs writing them to `stdout`.

## Hierarchy

* [Logger](_logger_.logger.md)

  * **FakeLogger**

## Implements

* [LoggerContract](../interfaces/_contracts_.loggercontract.md)

## Index

### Constructors

* [constructor](_fakelogger_.fakelogger.md#constructor)

### Properties

* [$config](_fakelogger_.fakelogger.md#protected-$config)
* [pino](_fakelogger_.fakelogger.md#pino)

### Accessors

* [LOG_VERSION](_fakelogger_.fakelogger.md#log_version)
* [level](_fakelogger_.fakelogger.md#level)
* [levelNumber](_fakelogger_.fakelogger.md#levelnumber)
* [levels](_fakelogger_.fakelogger.md#levels)
* [logs](_fakelogger_.fakelogger.md#logs)
* [pinoVersion](_fakelogger_.fakelogger.md#pinoversion)

### Methods

* [bindings](_fakelogger_.fakelogger.md#bindings)
* [child](_fakelogger_.fakelogger.md#child)
* [clear](_fakelogger_.fakelogger.md#clear)
* [debug](_fakelogger_.fakelogger.md#debug)
* [error](_fakelogger_.fakelogger.md#error)
* [fatal](_fakelogger_.fakelogger.md#fatal)
* [info](_fakelogger_.fakelogger.md#info)
* [isLevelEnabled](_fakelogger_.fakelogger.md#islevelenabled)
* [log](_fakelogger_.fakelogger.md#log)
* [trace](_fakelogger_.fakelogger.md#trace)
* [warn](_fakelogger_.fakelogger.md#warn)

## Constructors

###  constructor

\+ **new FakeLogger**(`config`: DeepReadonly‹[LoggerConfigContract](../modules/_contracts_.md#loggerconfigcontract)›, `pino?`: Pino.Logger): *[FakeLogger](_fakelogger_.fakelogger.md)*

*Overrides [Logger](_logger_.logger.md).[constructor](_logger_.logger.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | DeepReadonly‹[LoggerConfigContract](../modules/_contracts_.md#loggerconfigcontract)› |
`pino?` | Pino.Logger |

**Returns:** *[FakeLogger](_fakelogger_.fakelogger.md)*

## Properties

### `Protected` $config

• **$config**: *DeepReadonly‹[LoggerConfigContract](../modules/_contracts_.md#loggerconfigcontract)›*

*Inherited from [Logger](_logger_.logger.md).[$config](_logger_.logger.md#protected-$config)*

___

###  pino

• **pino**: *Pino.Logger*

*Inherited from [Logger](_logger_.logger.md).[pino](_logger_.logger.md#pino)*

## Accessors

###  LOG_VERSION

• **get LOG_VERSION**(): *number*

*Inherited from [Logger](_logger_.logger.md).[LOG_VERSION](_logger_.logger.md#log_version)*

Returns the log formatting version

**Returns:** *number*

___

###  level

• **get level**(): *string*

*Inherited from [Logger](_logger_.logger.md).[level](_logger_.logger.md#level)*

Returns the current logger level

**Returns:** *string*

___

###  levelNumber

• **get levelNumber**(): *number*

*Inherited from [Logger](_logger_.logger.md).[levelNumber](_logger_.logger.md#levelnumber)*

Returns the current logger level number

**Returns:** *number*

___

###  levels

• **get levels**(): *Pino.LevelMapping*

*Inherited from [Logger](_logger_.logger.md).[levels](_logger_.logger.md#levels)*

A map of levels

**Returns:** *Pino.LevelMapping*

___

###  logs

• **get logs**(): *any[]*

An array of in-memory logs

**Returns:** *any[]*

___

###  pinoVersion

• **get pinoVersion**(): *string*

*Inherited from [Logger](_logger_.logger.md).[pinoVersion](_logger_.logger.md#pinoversion)*

Returns the pino version

**Returns:** *string*

## Methods

###  bindings

▸ **bindings**(): *object*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

*Inherited from [Logger](_logger_.logger.md).[bindings](_logger_.logger.md#bindings)*

Returns default bindings for the logger

**Returns:** *object*

* \[ **key**: *string*\]: any

___

###  child

▸ **child**(`bindings`: object): *[FakeLogger](_fakelogger_.fakelogger.md)*

*Overrides [Logger](_logger_.logger.md).[child](_logger_.logger.md#child)*

Returns the child fake logger. All logs from the child
are writte to the same top level stream

**Parameters:**

Name | Type |
------ | ------ |
`bindings` | object |

**Returns:** *[FakeLogger](_fakelogger_.fakelogger.md)*

___

###  clear

▸ **clear**(): *void*

Clear in-memory logs

**Returns:** *void*

___

###  debug

▸ **debug**(`message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

*Inherited from [Logger](_logger_.logger.md).[debug](_logger_.logger.md#debug)*

Log message at debug level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **debug**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

*Inherited from [Logger](_logger_.logger.md).[debug](_logger_.logger.md#debug)*

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

*Inherited from [Logger](_logger_.logger.md).[error](_logger_.logger.md#error)*

Log message at error level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **error**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

*Inherited from [Logger](_logger_.logger.md).[error](_logger_.logger.md#error)*

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

*Inherited from [Logger](_logger_.logger.md).[fatal](_logger_.logger.md#fatal)*

Log message at fatal level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **fatal**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

*Inherited from [Logger](_logger_.logger.md).[fatal](_logger_.logger.md#fatal)*

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

*Inherited from [Logger](_logger_.logger.md).[info](_logger_.logger.md#info)*

Log message at info level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **info**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

*Inherited from [Logger](_logger_.logger.md).[info](_logger_.logger.md#info)*

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

*Inherited from [Logger](_logger_.logger.md).[isLevelEnabled](_logger_.logger.md#islevelenabled)*

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

*Inherited from [Logger](_logger_.logger.md).[log](_logger_.logger.md#log)*

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

*Inherited from [Logger](_logger_.logger.md).[log](_logger_.logger.md#log)*

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

*Inherited from [Logger](_logger_.logger.md).[trace](_logger_.logger.md#trace)*

Log message at trace level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **trace**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

*Inherited from [Logger](_logger_.logger.md).[trace](_logger_.logger.md#trace)*

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

*Inherited from [Logger](_logger_.logger.md).[warn](_logger_.logger.md#warn)*

Log message at warn level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **warn**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

*Implementation of [LoggerContract](../interfaces/_contracts_.loggercontract.md)*

*Inherited from [Logger](_logger_.logger.md).[warn](_logger_.logger.md#warn)*

**Parameters:**

Name | Type |
------ | ------ |
`mergingObject` | any |
`message` | string |
`...values` | any[] |

**Returns:** *void*