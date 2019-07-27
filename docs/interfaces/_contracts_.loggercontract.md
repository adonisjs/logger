> **[@poppinss/logger](../README.md)**

[Globals](../README.md) / ["contracts"](../modules/_contracts_.md) / [LoggerContract](_contracts_.loggercontract.md) /

# Interface: LoggerContract

Logger interface that main and fake logger implements

## Hierarchy

* **LoggerContract**

## Implemented by

* [FakeLogger](../classes/_fakelogger_.fakelogger.md)
* [Logger](../classes/_logger_.logger.md)

## Index

### Properties

* [LOG_VERSION](_contracts_.loggercontract.md#log_version)
* [level](_contracts_.loggercontract.md#level)
* [levelNumber](_contracts_.loggercontract.md#levelnumber)
* [levels](_contracts_.loggercontract.md#levels)
* [pinoVersion](_contracts_.loggercontract.md#pinoversion)

### Methods

* [bindings](_contracts_.loggercontract.md#bindings)
* [child](_contracts_.loggercontract.md#child)
* [debug](_contracts_.loggercontract.md#debug)
* [error](_contracts_.loggercontract.md#error)
* [fatal](_contracts_.loggercontract.md#fatal)
* [info](_contracts_.loggercontract.md#info)
* [isLevelEnabled](_contracts_.loggercontract.md#islevelenabled)
* [log](_contracts_.loggercontract.md#log)
* [trace](_contracts_.loggercontract.md#trace)
* [warn](_contracts_.loggercontract.md#warn)

## Properties

###  LOG_VERSION

• **LOG_VERSION**: *number*

___

###  level

• **level**: *string*

___

###  levelNumber

• **levelNumber**: *number*

___

###  levels

• **levels**: *`LevelMapping`*

___

###  pinoVersion

• **pinoVersion**: *string*

## Methods

###  bindings

▸ **bindings**(): *object*

**Returns:** *object*

● \[▪ **key**: *string*\]: any

___

###  child

▸ **child**(`bindings`: object): *[LoggerContract](_contracts_.loggercontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`bindings` | object |

**Returns:** *[LoggerContract](_contracts_.loggercontract.md)*

___

###  debug

▸ **debug**(`message`: string, ...`values`: any[]): *void*

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

**Parameters:**

Name | Type |
------ | ------ |
`level` | string |

**Returns:** *boolean*

___

###  log

▸ **log**(`level`: string, `message`: string, ...`values`: any[]): *void*

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