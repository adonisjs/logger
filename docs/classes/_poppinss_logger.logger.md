[@poppinss/logger](../README.md) > [@poppinss/logger](../modules/_poppinss_logger.md) > [Logger](../classes/_poppinss_logger.logger.md)

# Class: Logger

Logger class built on top of pino with couple of changes in the configuration. You can access the underlying `pino` object using `logger.pino`.

## Hierarchy

**Logger**

↳  [FakeLogger](_poppinss_logger.fakelogger.md)

## Implements

* `LoggerContract`

## Index

### Constructors

* [constructor](_poppinss_logger.logger.md#constructor)

### Properties

* [$config](_poppinss_logger.logger.md#_config)
* [pino](_poppinss_logger.logger.md#pino)

### Accessors

* [LOG_VERSION](_poppinss_logger.logger.md#log_version)
* [level](_poppinss_logger.logger.md#level)
* [levelNumber](_poppinss_logger.logger.md#levelnumber)
* [levels](_poppinss_logger.logger.md#levels)
* [pinoVersion](_poppinss_logger.logger.md#pinoversion)

### Methods

* [bindings](_poppinss_logger.logger.md#bindings)
* [child](_poppinss_logger.logger.md#child)
* [debug](_poppinss_logger.logger.md#debug)
* [error](_poppinss_logger.logger.md#error)
* [fatal](_poppinss_logger.logger.md#fatal)
* [info](_poppinss_logger.logger.md#info)
* [isLevelEnabled](_poppinss_logger.logger.md#islevelenabled)
* [log](_poppinss_logger.logger.md#log)
* [trace](_poppinss_logger.logger.md#trace)
* [warn](_poppinss_logger.logger.md#warn)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Logger**($config: *`DeepReadonly`<`LoggerConfigContract`>*, pino: *`Pino.Logger`*): [Logger](_poppinss_logger.logger.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| $config | `DeepReadonly`<`LoggerConfigContract`> |
| pino | `Pino.Logger` |

**Returns:** [Logger](_poppinss_logger.logger.md)

___

## Properties

<a id="_config"></a>

### `<Protected>` $config

**● $config**: *`DeepReadonly`<`LoggerConfigContract`>*

___
<a id="pino"></a>

###  pino

**● pino**: *`Pino.Logger`*

___

## Accessors

<a id="log_version"></a>

###  LOG_VERSION

**get LOG_VERSION**(): `number`

Returns the log formatting version

**Returns:** `number`

___
<a id="level"></a>

###  level

**get level**(): `string`

Returns the current logger level

**Returns:** `string`

___
<a id="levelnumber"></a>

###  levelNumber

**get levelNumber**(): `number`

Returns the current logger level number

**Returns:** `number`

___
<a id="levels"></a>

###  levels

**get levels**(): `Pino.LevelMapping`

A map of levels

**Returns:** `Pino.LevelMapping`

___
<a id="pinoversion"></a>

###  pinoVersion

**get pinoVersion**(): `string`

Returns the pino version

**Returns:** `string`

___

## Methods

<a id="bindings"></a>

###  bindings

▸ **bindings**(): `object`

Returns default bindings for the logger

**Returns:** `object`

___
<a id="child"></a>

###  child

▸ **child**(bindings: *`object`*): [Logger](_poppinss_logger.logger.md)

Returns a child logger instance

**Parameters:**

| Name | Type |
| ------ | ------ |
| bindings | `object` |

**Returns:** [Logger](_poppinss_logger.logger.md)

___
<a id="debug"></a>

###  debug

▸ **debug**(message: *`string`*, ...values: *`any`[]*): `void`

▸ **debug**(mergingObject: *`any`*, message: *`string`*, ...values: *`any`[]*): `void`

Log message at debug level

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| mergingObject | `any` |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

___
<a id="error"></a>

###  error

▸ **error**(message: *`string`*, ...values: *`any`[]*): `void`

▸ **error**(mergingObject: *`any`*, message: *`string`*, ...values: *`any`[]*): `void`

Log message at error level

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| mergingObject | `any` |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

___
<a id="fatal"></a>

###  fatal

▸ **fatal**(message: *`string`*, ...values: *`any`[]*): `void`

▸ **fatal**(mergingObject: *`any`*, message: *`string`*, ...values: *`any`[]*): `void`

Log message at fatal level

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| mergingObject | `any` |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

___
<a id="info"></a>

###  info

▸ **info**(message: *`string`*, ...values: *`any`[]*): `void`

▸ **info**(mergingObject: *`any`*, message: *`string`*, ...values: *`any`[]*): `void`

Log message at info level

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| mergingObject | `any` |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

___
<a id="islevelenabled"></a>

###  isLevelEnabled

▸ **isLevelEnabled**(level: *`string`*): `boolean`

Returns a boolean telling if level is enabled or not.

**Parameters:**

| Name | Type |
| ------ | ------ |
| level | `string` |

**Returns:** `boolean`

___
<a id="log"></a>

###  log

▸ **log**(level: *`string`*, message: *`string`*, ...values: *`any`[]*): `void`

▸ **log**(level: *`string`*, mergingObject: *`any`*, message: *`string`*, ...values: *`any`[]*): `void`

Log message for any named level

**Parameters:**

| Name | Type |
| ------ | ------ |
| level | `string` |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| level | `string` |
| mergingObject | `any` |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

___
<a id="trace"></a>

###  trace

▸ **trace**(message: *`string`*, ...values: *`any`[]*): `void`

▸ **trace**(mergingObject: *`any`*, message: *`string`*, ...values: *`any`[]*): `void`

Log message at trace level

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| mergingObject | `any` |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

___
<a id="warn"></a>

###  warn

▸ **warn**(message: *`string`*, ...values: *`any`[]*): `void`

▸ **warn**(mergingObject: *`any`*, message: *`string`*, ...values: *`any`[]*): `void`

Log message at warn level

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| mergingObject | `any` |
| message | `string` |
| `Rest` values | `any`[] |

**Returns:** `void`

___

