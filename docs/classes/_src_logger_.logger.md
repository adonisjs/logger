[@adonisjs/logger](../README.md) › ["src/Logger"](../modules/_src_logger_.md) › [Logger](_src_logger_.logger.md)

# Class: Logger

Logger class built on top of pino with couple of changes in
the configuration. You can access the underlying `pino`
object using `logger.pino`.

## Hierarchy

* **Logger**

  ↳ [FakeLogger](_src_fakelogger_.fakelogger.md)

## Implements

* LoggerContract

## Index

### Constructors

* [constructor](_src_logger_.logger.md#constructor)

### Properties

* [$config](_src_logger_.logger.md#protected-config)
* [pino](_src_logger_.logger.md#pino)

### Accessors

* [level](_src_logger_.logger.md#level)
* [levelNumber](_src_logger_.logger.md#levelnumber)
* [levels](_src_logger_.logger.md#levels)
* [pinoVersion](_src_logger_.logger.md#pinoversion)

### Methods

* [bindings](_src_logger_.logger.md#bindings)
* [child](_src_logger_.logger.md#child)
* [debug](_src_logger_.logger.md#debug)
* [error](_src_logger_.logger.md#error)
* [fatal](_src_logger_.logger.md#fatal)
* [info](_src_logger_.logger.md#info)
* [isLevelEnabled](_src_logger_.logger.md#islevelenabled)
* [log](_src_logger_.logger.md#log)
* [trace](_src_logger_.logger.md#trace)
* [warn](_src_logger_.logger.md#warn)

## Constructors

###  constructor

\+ **new Logger**(`$config`: DeepReadonly‹LoggerConfigContract›, `pino?`: Pino.Logger): *[Logger](_src_logger_.logger.md)*

**Parameters:**

Name | Type |
------ | ------ |
`$config` | DeepReadonly‹LoggerConfigContract› |
`pino?` | Pino.Logger |

**Returns:** *[Logger](_src_logger_.logger.md)*

## Properties

### `Protected` $config

• **$config**: *DeepReadonly‹LoggerConfigContract›*

___

###  pino

• **pino**: *Pino.Logger*

## Accessors

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

Returns default bindings for the logger

**Returns:** *object*

* \[ **key**: *string*\]: any

___

###  child

▸ **child**(`bindings`: object): *[Logger](_src_logger_.logger.md)‹›*

Returns a child logger instance

**Parameters:**

▪ **bindings**: *object*

Name | Type |
------ | ------ |
`level?` | Pino.Level &#124; string |
`serializers?` | undefined &#124; object |

**Returns:** *[Logger](_src_logger_.logger.md)‹›*

___

###  debug

▸ **debug**(`message`: string, ...`values`: any[]): *void*

Log message at debug level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **debug**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

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

Log message at error level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **error**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

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

Log message at fatal level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **fatal**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

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

Log message at info level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **info**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

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

Log message for any named level

**Parameters:**

Name | Type |
------ | ------ |
`level` | string |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **log**(`level`: string, `mergingObject`: any, `message`: string, ...`values`: any[]): *void*

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

Log message at trace level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **trace**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

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

Log message at warn level

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`...values` | any[] |

**Returns:** *void*

▸ **warn**(`mergingObject`: any, `message`: string, ...`values`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`mergingObject` | any |
`message` | string |
`...values` | any[] |

**Returns:** *void*
