[@poppinss/logger](../README.md) > [@poppinss/logger](../modules/_poppinss_logger.md) > [LoggerContract](../interfaces/_poppinss_logger.loggercontract.md)

# Interface: LoggerContract

Logger interface that main and fake logger implements

## Hierarchy

**LoggerContract**

## Implemented by

* [FakeLogger](../classes/_poppinss_logger.fakelogger.md)
* [Logger](../classes/_poppinss_logger.logger.md)

## Index

### Properties

* [LOG_VERSION](_poppinss_logger.loggercontract.md#log_version)
* [level](_poppinss_logger.loggercontract.md#level)
* [levelNumber](_poppinss_logger.loggercontract.md#levelnumber)
* [levels](_poppinss_logger.loggercontract.md#levels)
* [pinoVersion](_poppinss_logger.loggercontract.md#pinoversion)

### Methods

* [bindings](_poppinss_logger.loggercontract.md#bindings)
* [child](_poppinss_logger.loggercontract.md#child)
* [debug](_poppinss_logger.loggercontract.md#debug)
* [error](_poppinss_logger.loggercontract.md#error)
* [fatal](_poppinss_logger.loggercontract.md#fatal)
* [info](_poppinss_logger.loggercontract.md#info)
* [isLevelEnabled](_poppinss_logger.loggercontract.md#islevelenabled)
* [log](_poppinss_logger.loggercontract.md#log)
* [trace](_poppinss_logger.loggercontract.md#trace)
* [warn](_poppinss_logger.loggercontract.md#warn)

---

## Properties

<a id="log_version"></a>

###  LOG_VERSION

**● LOG_VERSION**: *`number`*

___
<a id="level"></a>

###  level

**● level**: *`string`*

___
<a id="levelnumber"></a>

###  levelNumber

**● levelNumber**: *`number`*

___
<a id="levels"></a>

###  levels

**● levels**: *`LevelMapping`*

___
<a id="pinoversion"></a>

###  pinoVersion

**● pinoVersion**: *`string`*

___

## Methods

<a id="bindings"></a>

###  bindings

▸ **bindings**(): `object`

**Returns:** `object`

___
<a id="child"></a>

###  child

▸ **child**(bindings: *`object`*): [LoggerContract](_poppinss_logger.loggercontract.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| bindings | `object` |

**Returns:** [LoggerContract](_poppinss_logger.loggercontract.md)

___
<a id="debug"></a>

###  debug

▸ **debug**(message: *`string`*, ...values: *`any`[]*): `void`

▸ **debug**(mergingObject: *`any`*, message: *`string`*, ...values: *`any`[]*): `void`

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

